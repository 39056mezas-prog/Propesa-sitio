// PROPESA · sitio público
(function () {
  var raiz = document.documentElement;
  var quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var observa = 'IntersectionObserver' in window;
  if (!quieto && observa) raiz.classList.add('js');

  document.addEventListener('DOMContentLoaded', function () {
    var portada = document.querySelector('.portada');
    var cabecera = document.querySelector('.cabecera');


    // Cabecera transparente sobre el mapa, sólida al bajar.
    if (cabecera) {
      var marca = function () { cabecera.classList.toggle('solida', window.scrollY > 40); };
      marca();
      window.addEventListener('scroll', marca, { passive: true });
    }

    // La langosta de la portada da un coletazo al pasarle el ratón o tocarla.
    var langosta = document.querySelector('.langosta-viva');
    if (langosta && !quieto) {
      var coletazo = function (e) {
        if (e.type === 'pointerenter' && e.pointerType !== 'mouse') return;
        langosta.classList.remove('coletazo'); void langosta.offsetWidth; langosta.classList.add('coletazo');
      };
      langosta.addEventListener('pointerenter', coletazo);
      langosta.addEventListener('pointerdown', coletazo);
      langosta.addEventListener('animationend', function (e) { if (e.animationName === 'coletazo') langosta.classList.remove('coletazo'); });
    }

    // Cierra el menú del teléfono al elegir una sección.
    var menu = document.querySelector('.menu');
    if (menu) menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) menu.removeAttribute('open');
    });
  });
})();
