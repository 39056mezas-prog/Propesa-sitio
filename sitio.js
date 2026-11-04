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

    // Cierra el menú del teléfono al elegir una sección.
    var menu = document.querySelector('.menu');
    if (menu) menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) menu.removeAttribute('open');
    });
  });
})();
