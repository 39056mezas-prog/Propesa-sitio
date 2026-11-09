// PROPESA · globo de la portada
// La imagen satelital (NASA Blue Marble) sobre una esfera en WebGL, sin librerías.
// Se gira arrastrando dentro de un límite (entre Asia y Baja California); al soltar sigue
// girando y frena. Encima, en un lienzo 2D: rutas en arcos, luces que viajan, puntos y nombres.
(function () {
  'use strict';
  var RAD = Math.PI / 180;
  // 8/nov/2026 (usuario: «quiero poder girar el globo»): de lado gira completo (360°); arriba y abajo con límite.
  // Si nadie lo toca unos segundos, regresa solo a Ensenada y Asia.
  var LIM = { lat: [-10, 55] };
  var dlonA = function (a, b) { return ((b - a + 540) % 360) - 180; };   // diferencia más corta entre dos longitudes
  var INICIO = { lon: 177, lat: 22 };
  var ENS = [-116.6, 31.87];
  var DEST = [
    { n: 'China continental', p: [110, 31.5], dx: 12, dy: -14, a: 'left' },
    { n: 'Taiwán', p: [120.97, 23.75], dx: 14, dy: 2, a: 'left' },
    { n: 'Hong Kong', p: [114.17, 22.3], dx: -6, dy: 22, a: 'center' }
  ];

  var quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function arco(a, b, n) {
    // puntos de gran círculo entre a y b ([lon, lat] en grados)
    var p1 = xyz(a[0], a[1]), p2 = xyz(b[0], b[1]);
    var d = Math.acos(Math.max(-1, Math.min(1, p1[0] * p2[0] + p1[1] * p2[1] + p1[2] * p2[2])));
    var out = [];
    for (var i = 0; i <= n; i++) {
      var t = i / n, s1 = Math.sin((1 - t) * d) / Math.sin(d), s2 = Math.sin(t * d) / Math.sin(d);
      var x = s1 * p1[0] + s2 * p2[0], y = s1 * p1[1] + s2 * p2[1], z = s1 * p1[2] + s2 * p2[2];
      out.push([Math.atan2(x, z) / RAD, Math.asin(y) / RAD]);
    }
    return out;
  }
  function xyz(lon, lat) {
    var l = lon * RAD, f = lat * RAD;
    return [Math.cos(f) * Math.sin(l), Math.sin(f), Math.cos(f) * Math.cos(l)];
  }

  function iniciar() {
    var caja = document.querySelector('.globo');
    if (!caja) return;
    var gl, prog, tex, lienzo = caja.querySelector('.globo-gl'), capa = caja.querySelector('.globo-capa');
    var ctx = capa.getContext('2d');
    var portada = document.querySelector('.portada');
    var rutas = DEST.map(function (d) { return arco(ENS, d.p, 140); });
    var vista = { lon: INICIO.lon, lat: INICIO.lat, vlon: 0, vlat: 0 };
    var capaLista = false, arrastre = null, ultimoToque = -1e9, t0 = performance.now(), visible = true, listo = false;
    var W = 0, H = 0, dpr = 1, R = 0, cx = 0, cy = 0;
    function tocado() { if (portada) portada.classList.add('tocado'); }

    // --- WebGL ---
    try { gl = lienzo.getContext('webgl', { antialias: true, premultipliedAlpha: true, alpha: true }); } catch (e) { gl = null; }
    if (gl) {
      var vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
      var fs = [
        'precision highp float;',
        'uniform sampler2D tex;uniform vec2 c;uniform float r;uniform vec2 rot;',
        'const float PI=3.14159265;',
        'void main(){',
        ' vec2 q=(gl_FragCoord.xy-c)/r; float d=length(q);',
        ' float glow=smoothstep(1.16,1.0,d)*(1.-smoothstep(0.98,1.0,d));',
        ' vec4 halo=vec4(vec3(.36,.68,1.)*glow*.55,glow*.55);',
        ' if(d>1.){gl_FragColor=halo;return;}',
        ' float z=sqrt(1.-d*d);',
        ' float y1=q.y*cos(rot.y)+z*sin(rot.y); float z1=-q.y*sin(rot.y)+z*cos(rot.y);',
        ' float lat=asin(clamp(y1,-1.,1.)); float lon=rot.x+atan(q.x,z1);',
        ' vec2 uv=vec2(fract(lon/(2.*PI)),(PI*.5-lat)/PI);',
        ' vec3 col=texture2D(tex,uv).rgb;',
        ' col=pow(col,vec3(.82))*1.08;',
        ' vec3 n=vec3(q,z); float dif=.55+.55*max(dot(n,normalize(vec3(-.2,.35,1.))),0.);',
        ' col*=dif*mix(.6,1.,sqrt(z));',
        ' col+=vec3(.25,.55,1.)*pow(1.-z,3.)*.55;',
        ' float a=smoothstep(1.,1.-1.6/r,d);',
        ' gl_FragColor=vec4(col*a,a)+halo*(1.-a);',
        '}'
      ].join('\n');
      var sh = function (t, s) { var o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return gl.getShaderParameter(o, gl.COMPILE_STATUS) ? o : null; };
      var v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);
      if (v && f) {
        prog = gl.createProgram(); gl.attachShader(prog, v); gl.attachShader(prog, f); gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) gl = null;
      } else gl = null;
    }
    if (gl) {
      gl.useProgram(prog);
      var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      var loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      var U = { c: gl.getUniformLocation(prog, 'c'), r: gl.getUniformLocation(prog, 'r'), rot: gl.getUniformLocation(prog, 'rot') };
      var img = new Image();
      img.decoding = 'async';
      img.onload = function () {
        tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        var an = gl.getExtension('EXT_texture_filter_anisotropic');
        if (an) gl.texParameterf(gl.TEXTURE_2D, an.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(8, gl.getParameter(an.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
        listo = true; caja.classList.add('vivo');
      };
      img.src = caja.getAttribute('data-textura');
    }

    // --- tamaño ---
    function medir() {
      var r = caja.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height; R = Math.min(W, H) / 2 * 0.86; cx = W / 2; cy = H / 2;
      [lienzo, capa].forEach(function (c) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); });
      if (gl) gl.viewport(0, 0, lienzo.width, lienzo.height);
    }

    // --- proyección (igual que el sombreador) ---
    function proy(lon, lat) {
      var dl = (lon - vista.lon) * RAD, f = lat * RAD, f0 = vista.lat * RAD;
      var x = Math.cos(f) * Math.sin(dl), y = Math.sin(f), z = Math.cos(f) * Math.cos(dl);
      var y2 = y * Math.cos(f0) - z * Math.sin(f0), z2 = y * Math.sin(f0) + z * Math.cos(f0);
      return [cx + x * R, cy - y2 * R, z2];
    }

    // --- el avión de la ruta ---
    // Lo único que se mueve sobre el globo (pedido del usuario, 7/nov/2026): un avioncito de carga que va por la ruta
    // de Ensenada a China continental, con su sombra en el mar. Sin barcos, lancha, langostas ni avión grande.
    // Marco local en (lon, lat): x = este, y = sur, en px; se encoge hacia el borde como la Tierra.
    function marco(lon, lat, s) {
      var p = proy(lon, lat);
      if (p[2] < 0.06) return null;
      var d = 0.3, pe = proy(lon + d / Math.max(0.2, Math.cos(lat * RAD)), lat), pn = proy(lon, lat + d);
      var k = s / (R * d * RAD), e = [(pe[0] - p[0]) * k, (pe[1] - p[1]) * k], n = [(p[0] - pn[0]) * k, (p[1] - pn[1]) * k];
      [e, n].forEach(function (v) { var l = Math.hypot(v[0], v[1]) / s; if (l > 0 && l < 0.6) { v[0] *= 0.6 / l; v[1] *= 0.6 / l; } });   // que no se vuelva una raya en el borde
      ctx.setTransform(dpr * e[0], dpr * e[1], dpr * n[0], dpr * n[1], dpr * p[0], dpr * p[1]);
      ctx.globalAlpha = Math.min(1, (p[2] - 0.06) * 5) * Math.min(1, 0.55 + p[2]);
      return p;
    }
    function rumbo(a, b) {    // ángulo (rad, desde el este hacia el norte) de a a b
      var dl = ((b[0] - a[0] + 540) % 360) - 180;
      return Math.atan2(b[1] - a[1], dl * Math.cos(a[1] * RAD));
    }
    function forma(pts) { ctx.beginPath(); ctx.moveTo(pts[0], pts[1]); for (var i = 2; i < pts.length; i += 2) ctx.lineTo(pts[i], pts[i + 1]); ctx.closePath(); }
    function avion(sombra) {
      ctx.fillStyle = sombra ? 'rgba(2,8,30,.4)' : '#F4F7FB';
      forma([1, 0, .9, .09, -.9, .08, -1, 0, -.9, -.08, .9, -.09]); ctx.fill();                       // fuselaje
      forma([.22, .1, -.32, .98, -.5, .98, -.2, .1, -.2, -.1, -.5, -.98, -.32, -.98, .22, -.1]); ctx.fill();   // alas
      forma([-.72, .06, -.98, .4, -1.06, .4, -.95, .05, -.95, -.05, -1.06, -.4, -.98, -.4, -.72, -.06]); ctx.fill();
      if (sombra) return;
      ctx.fillStyle = '#B8C3D3'; ctx.fillRect(.02, .3, .22, .1); ctx.fillRect(.02, -.4, .22, .1);   // motores
      ctx.fillStyle = '#0A2373'; forma([-.75, -.025, -1.02, -.025, -1.02, .025, -.75, .025]); ctx.fill();   // deriva
    }
    function avionRuta(t) {
      var s = Math.max(6, R / 34), ruta = rutas[0], g = (t / 42000) % 1, i = Math.max(1, Math.floor(g * (ruta.length - 1))), a = ruta[i - 1], b = ruta[i];
      var h = rumbo(a, b), fade = Math.min(1, g * 12, (1 - g) * 12);
      ctx.save();
      if (marco(b[0], b[1], s * 1.25)) { ctx.globalAlpha *= fade * .8; ctx.translate(.35, .55); ctx.rotate(-h); avion(true); }
      if (marco(b[0], b[1], s * 1.25)) { ctx.globalAlpha *= fade; ctx.rotate(-h); avion(false); }
      ctx.restore();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.globalAlpha = 1;
    }

    // --- capa 2D ---
    function capaDibujar(t) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      var lw = Math.max(1.6, R / 210);
      var dibujo = quieto ? 1 : Math.min(1, Math.max(0, (t - 400) / 2400));
      dibujo = 1 - Math.pow(1 - dibujo, 3);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      rutas.forEach(function (ruta, k) {
        var n = Math.floor((ruta.length - 1) * Math.max(0, Math.min(1, dibujo * 1.12 - k * .06)));
        ctx.strokeStyle = 'rgba(240,96,75,.95)'; ctx.lineWidth = lw;
        ctx.beginPath(); var dentro = false;
        for (var i = 0; i <= n; i++) {
          var p = proy(ruta[i][0], ruta[i][1]);
          if (p[2] > 0.02) { if (dentro) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); dentro = true; } else dentro = false;
        }
        ctx.stroke();
        // luz que viaja
        if (!quieto && dibujo >= 1) {
          var per = 6500, fase = ((t - 2800 - k * 2200) % per + per) % per / per;
          var cab = Math.floor(fase * (ruta.length - 1)), cola = 14;
          for (var j = Math.max(1, cab - cola); j <= cab; j++) {
            var a = proy(ruta[j - 1][0], ruta[j - 1][1]), b = proy(ruta[j][0], ruta[j][1]);
            if (a[2] <= 0.02 || b[2] <= 0.02) continue;
            var w = 1 - (cab - j) / cola;
            ctx.strokeStyle = 'rgba(91,186,238,' + (0.45 * w) + ')'; ctx.lineWidth = lw * 5 * w;
            ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
            ctx.strokeStyle = 'rgba(255,255,255,' + w + ')'; ctx.lineWidth = lw * 1.6;
            ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
          }
        }
      });
      if (dibujo >= 1) avionRuta(quieto ? 0 : t);
      // puntos y nombres
      // Los nombres van siempre, también en el teléfono (antes solo con el globo grande, R > 230: en el teléfono y en
      // pantallas chicas o con zoom no salían). En un globo chico la letra y la separación se achican.
      var fs = Math.max(11, Math.min(19, R / 22)), ks = Math.max(.72, fs / 19);
      function nombre(txt, x, y, al, peso, color) {
        ctx.font = peso + ' ' + fs + 'px Archivo, system-ui, sans-serif';
        ctx.textAlign = al; ctx.textBaseline = 'middle';
        ctx.lineWidth = Math.max(3, fs * .27); ctx.strokeStyle = 'rgba(6,22,74,.9)'; ctx.strokeText(txt, x, y);
        ctx.fillStyle = color || '#fff'; ctx.fillText(txt, x, y);
      }
      // Puntos y nombres quietos desde el primer cuadro (pedido del usuario: los nombres «aparecían» de golpe al terminar
      // de dibujarse las rutas). Ya no esperan a la ruta ni hacen ninguna animación.
      DEST.forEach(function (d) {
        var p = proy(d.p[0], d.p[1]); if (p[2] < 0.08) return;
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#F0604B'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.arc(p[0], p[1], Math.max(4, R / 80), 0, 7); ctx.fill(); ctx.stroke();
        nombre(d.n, p[0] + d.dx * ks, p[1] + d.dy * ks, d.a, 700);
        ctx.globalAlpha = 1;
      });
      var e = proy(ENS[0], ENS[1]);
      if (e[2] > 0.05) {
        var rr = Math.max(4.5, R / 70);
        if (!quieto) {
          var pl = ((t % 2800) / 2800);
          ctx.strokeStyle = 'rgba(255,255,255,' + (0.9 * (1 - pl)) + ')'; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(e[0], e[1], rr * (1 + pl * 2.4), 0, 7); ctx.stroke();
        }
        ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0A2373'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(e[0], e[1], rr, 0, 7); ctx.fill(); ctx.stroke();
        nombre('Ensenada', e[0], e[1] + fs * 1.6, 'center', 700); nombre('Baja California', e[0], e[1] + fs * 2.75, 'center', 500, '#C9D6F0');
      }
      {
        var o = proy(-178, 12);
        if (o[2] > 0.2) { ctx.globalAlpha = .8; ctx.font = 'italic 450 ' + (fs * 1.05) + 'px Archivo, system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; ctx.fillText('O c é a n o   P a c í f i c o', o[0], o[1]); ctx.globalAlpha = 1; }
      }
    }

    // --- movimiento ---
    function limitar() {
      // fuera del límite el globo regresa como resorte
      var r = function (v, lim) { return v < lim[0] ? (lim[0] - v) : v > lim[1] ? (lim[1] - v) : 0; };
      var ra = r(vista.lat, LIM.lat);
      vista.lon = ((vista.lon % 360) + 360) % 360;
      if (ra) { vista.vlat *= .5; vista.lat += ra * .14; }
    }
    // Fuera de la pantalla el globo no pide cuadros (antes seguía pidiendo 60 por segundo sin dibujar): se apaga solo y
    // vuelve cuando la portada se ve otra vez.
    var corriendo = false;
    function arrancar() { if (!corriendo) { corriendo = true; requestAnimationFrame(cuadro); } }
    function cuadro(ahora) {
      if (!visible && !arrastre) { corriendo = false; return; }
      if (visible) {
        var t = ahora - t0;
        if (!arrastre) {
          vista.lon += vista.vlon; vista.lat += vista.vlat;
          vista.vlon *= 0.94; vista.vlat *= 0.94;
          if (Math.abs(vista.vlon) < 0.002) vista.vlon = 0;
          if (Math.abs(vista.vlat) < 0.002) vista.vlat = 0;
          // en reposo, el globo se mece despacio (si el equipo permite movimiento)
          if (!quieto && ahora - ultimoToque > 8000 && !vista.vlon && !vista.vlat) {
            var meta = INICIO.lon + Math.sin(t / 9000) * 6, lejos = Math.abs(dlonA(vista.lon, INICIO.lon)) > 20;
            vista.lon += dlonA(vista.lon, meta) * (lejos ? 0.02 : 0.006);
            vista.lat += (INICIO.lat - vista.lat) * 0.006;
          }
          limitar();
        }
        if (gl && listo) {
          gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
          gl.uniform2f(U.c, cx * dpr, lienzo.height - cy * dpr);
          gl.uniform1f(U.r, R * dpr);
          gl.uniform2f(U.rot, vista.lon * RAD, vista.lat * RAD);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
        capaDibujar(t);
        if (!capaLista) { capaLista = true; caja.classList.add('capa-lista'); }
      }
      requestAnimationFrame(cuadro);
    }

    // --- arrastre (ratón, dedo y teclado) ---
    if (gl) {
      caja.addEventListener('pointerdown', function (e) {
        if (e.button > 0) return;
        arrastre = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId };
        vista.vlon = vista.vlat = 0; ultimoToque = performance.now();
        caja.classList.add('arrastrando'); tocado();
        try { caja.setPointerCapture(e.pointerId); } catch (_) {}
      });
      caja.addEventListener('pointermove', function (e) {
        if (!arrastre || e.pointerId !== arrastre.id) return;
        var k = 57 / R, dx = e.clientX - arrastre.x, dy = e.clientY - arrastre.y, ahora = performance.now();
        var dt = Math.max(8, ahora - arrastre.t);
        var dlon = -dx * k, dlat = e.pointerType === 'touch' ? 0 : dy * k;
        var borde = function (v, lim, d) { var fuera = (v < lim[0] && d < 0) || (v > lim[1] && d > 0); return fuera ? d * .25 : d; };
        dlat = borde(vista.lat, LIM.lat, dlat);
        vista.lon = vista.lon + dlon;
        vista.lat = Math.max(LIM.lat[0] - 3, Math.min(LIM.lat[1] + 3, vista.lat + dlat));
        vista.vlon = dlon * 16 / dt; vista.vlat = dlat * 16 / dt;
        arrastre.x = e.clientX; arrastre.y = e.clientY; arrastre.t = ahora; ultimoToque = ahora;
      });
      var soltar = function () { arrastre = null; caja.classList.remove('arrastrando'); ultimoToque = performance.now(); };
      caja.addEventListener('pointerup', soltar);
      caja.addEventListener('pointercancel', soltar);
      caja.addEventListener('keydown', function (e) {
        var paso = { ArrowLeft: [-4, 0], ArrowRight: [4, 0], ArrowUp: [0, 3], ArrowDown: [0, -3] }[e.key];
        if (!paso) return;
        e.preventDefault(); vista.vlon = paso[0] * .12; vista.vlat = paso[1] * .12; ultimoToque = performance.now();
        if ((vista.lat <= LIM.lat[0] && paso[1] < 0) || (vista.lat >= LIM.lat[1] && paso[1] > 0)) vista.vlat = 0;
        tocado();
      });
    } else {
      caja.removeAttribute('tabindex');
      caja.classList.add('sin-gl'); if (portada) portada.classList.add('sin-gl');
    }

    if ('IntersectionObserver' in window && portada) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) arrancar(); }, { threshold: 0 }).observe(portada);
    }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) t0 = performance.now() - 6000; });
    medir();
    window.addEventListener('resize', medir);
    // Si la caja del globo cambia de tamaño sin que cambie la ventana (la página termina de acomodarse, la barra del
    // navegador se esconde), se vuelve a medir; antes el globo se quedaba con la medida vieja hasta mover la pantalla.
    if ('ResizeObserver' in window) new ResizeObserver(function () { var r = caja.getBoundingClientRect(); if (Math.abs(r.width - W) > .5 || Math.abs(r.height - H) > .5) medir(); }).observe(caja);
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(arrancar);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
