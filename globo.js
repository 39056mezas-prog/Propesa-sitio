// PROPESA · globo de la portada
// La imagen satelital (NASA Blue Marble) sobre una esfera en WebGL, sin librerías.
// Se gira arrastrando dentro de un límite (entre Asia y Baja California); al soltar sigue
// girando y frena. Encima, en un lienzo 2D: rutas en arcos, luces que viajan, puntos y nombres.
(function () {
  'use strict';
  var RAD = Math.PI / 180;
  var LIM = { lon: [165, 189], lat: [10, 36] };       // límites: Ensenada y Asia siempre a la vista
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
    var arrastre = null, ultimoToque = -1e9, t0 = performance.now(), visible = true, listo = false, perdido = false, clave = '';
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
      // El teléfono puede quitarle el 3D a la página (poca memoria, al volver de otra app): regresa la foto fija y el globo deja de girar,
      // igual que en un equipo sin 3D. Antes quedaban las rutas flotando sobre el fondo, sin la Tierra.
      lienzo.addEventListener('webglcontextlost', function (e) {
        e.preventDefault(); perdido = true; listo = false; arrastre = null;
        vista.lon = INICIO.lon; vista.lat = INICIO.lat; vista.vlon = vista.vlat = 0;
        caja.classList.remove('vivo'); caja.classList.remove('arrastrando'); caja.classList.add('sin-gl'); caja.removeAttribute('tabindex');
        if (portada) portada.classList.add('sin-gl');
      });
    }

    // --- tamaño ---
    function medir() {
      var r = caja.getBoundingClientRect();
      clave = '';   // cambiar el tamaño del lienzo lo borra: hay que volver a dibujar
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
      // puntos y nombres
      var fs = Math.max(12, Math.min(19, R / 22)), grandes = R > 230;
      function nombre(txt, x, y, al, peso, color) {
        ctx.font = peso + ' ' + fs + 'px Archivo, system-ui, sans-serif';
        ctx.textAlign = al; ctx.textBaseline = 'middle';
        ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(6,22,74,.9)'; ctx.strokeText(txt, x, y);
        ctx.fillStyle = color || '#fff'; ctx.fillText(txt, x, y);
      }
      DEST.forEach(function (d) {
        var p = proy(d.p[0], d.p[1]); if (p[2] < 0.08 || dibujo < 1) return;
        ctx.globalAlpha = Math.min(1, (p[2] - .08) * 6);
        ctx.fillStyle = '#F0604B'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.arc(p[0], p[1], Math.max(4, R / 80), 0, 7); ctx.fill(); ctx.stroke();
        if (grandes) nombre(d.n, p[0] + d.dx, p[1] + d.dy, d.a, 700);
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
        if (grandes) { nombre('Ensenada', e[0], e[1] + fs * 1.6, 'center', 700); nombre('Baja California', e[0], e[1] + fs * 2.75, 'center', 500, '#C9D6F0'); }
      }
      if (grandes) {
        var o = proy(-178, 12);
        if (o[2] > 0.2) { ctx.globalAlpha = .8; ctx.font = 'italic 450 ' + (fs * 1.05) + 'px Archivo, system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; ctx.fillText('O c é a n o   P a c í f i c o', o[0], o[1]); ctx.globalAlpha = 1; }
      }
    }

    // --- movimiento ---
    function limitar() {
      // fuera del límite el globo regresa como resorte
      var r = function (v, lim) { return v < lim[0] ? (lim[0] - v) : v > lim[1] ? (lim[1] - v) : 0; };
      var rl = r(vista.lon, LIM.lon), ra = r(vista.lat, LIM.lat);
      if (rl) { vista.vlon *= .5; vista.lon += rl * .14; }
      if (ra) { vista.vlat *= .5; vista.lat += ra * .14; }
    }
    function cuadro(ahora) {
      if (visible) {
        var t = ahora - t0;
        if (!arrastre && gl && !perdido) {   // sin 3D la foto fija no gira: las rutas se quedan sobre ella
          vista.lon += vista.vlon; vista.lat += vista.vlat;
          vista.vlon *= 0.94; vista.vlat *= 0.94;
          if (Math.abs(vista.vlon) < 0.002) vista.vlon = 0;
          if (Math.abs(vista.vlat) < 0.002) vista.vlat = 0;
          // en reposo, el globo se mece despacio (si el equipo permite movimiento)
          if (!quieto && ahora - ultimoToque > 5000 && !vista.vlon && !vista.vlat) {
            var meta = INICIO.lon + Math.sin(t / 9000) * 6;
            vista.lon += (meta - vista.lon) * 0.006;
            vista.lat += (INICIO.lat - vista.lat) * 0.006;
          }
          limitar();
        }
        // Con «Reducir movimiento» no hay animaciones: se dibuja solo si algo cambió (antes, 60 veces por segundo).
        var k = quieto ? [vista.lon, vista.lat, W, H, dpr, listo].join() : '';
        if (quieto && k === clave) { requestAnimationFrame(cuadro); return; }
        clave = k;
        if (gl && listo) {
          gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
          gl.uniform2f(U.c, cx * dpr, lienzo.height - cy * dpr);
          gl.uniform1f(U.r, R * dpr);
          gl.uniform2f(U.rot, vista.lon * RAD, vista.lat * RAD);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
        capaDibujar(t);
      }
      requestAnimationFrame(cuadro);
    }

    // --- arrastre (ratón, dedo y teclado) ---
    if (gl) {
      caja.addEventListener('pointerdown', function (e) {
        if (e.button > 0 || perdido) return;
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
        dlon = borde(vista.lon, LIM.lon, dlon); dlat = borde(vista.lat, LIM.lat, dlat);
        vista.lon = Math.max(LIM.lon[0] - 4, Math.min(LIM.lon[1] + 4, vista.lon + dlon));
        vista.lat = Math.max(LIM.lat[0] - 3, Math.min(LIM.lat[1] + 3, vista.lat + dlat));
        vista.vlon = dlon * 16 / dt; vista.vlat = dlat * 16 / dt;
        arrastre.x = e.clientX; arrastre.y = e.clientY; arrastre.t = ahora; ultimoToque = ahora;
      });
      var soltar = function () { arrastre = null; caja.classList.remove('arrastrando'); ultimoToque = performance.now(); };
      caja.addEventListener('pointerup', soltar);
      caja.addEventListener('pointercancel', soltar);
      caja.addEventListener('keydown', function (e) {
        var paso = { ArrowLeft: [-4, 0], ArrowRight: [4, 0], ArrowUp: [0, 3], ArrowDown: [0, -3] }[e.key];
        if (!paso || perdido) return;
        e.preventDefault(); vista.vlon = paso[0] * .12; vista.vlat = paso[1] * .12; ultimoToque = performance.now();
        if ((vista.lon <= LIM.lon[0] && paso[0] < 0) || (vista.lon >= LIM.lon[1] && paso[0] > 0)) vista.vlon = 0;
        if ((vista.lat <= LIM.lat[0] && paso[1] < 0) || (vista.lat >= LIM.lat[1] && paso[1] > 0)) vista.vlat = 0;
        tocado();
      });
    } else {
      caja.removeAttribute('tabindex');
      caja.classList.add('sin-gl'); if (portada) portada.classList.add('sin-gl');
    }

    if ('IntersectionObserver' in window && portada) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { threshold: 0 }).observe(portada);
    }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) t0 = performance.now() - 6000; });
    medir();
    window.addEventListener('resize', medir);
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () {
      requestAnimationFrame(cuadro);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
