/**
 * Cambio de idioma sin recargar.
 *
 * Los dos idiomas están SIEMPRE en el HTML, solo se oculta uno con CSS. Así el
 * texto legal completo existe en la página aunque JavaScript falle, y los
 * buscadores y Apple pueden leerlo entero.
 */
;(function () {
  // Lo elegido antes manda; si no, el idioma del navegador; y por defecto
  // español, que es el mercado de AE.
  var saved = localStorage.getItem('ae.site.lang')
  var browser = (navigator.language || 'es').toLowerCase()
  var lang = saved === 'es' || saved === 'en' ? saved : browser.indexOf('en') === 0 ? 'en' : 'es'

  function apply(next) {
    lang = next
    localStorage.setItem('ae.site.lang', next)
    document.documentElement.lang = next
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.classList.toggle('on', el.getAttribute('data-lang') === next)
    })
    document.querySelectorAll('nav.langs button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.set === next))
    })
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('nav.langs button').forEach(function (b) {
      b.addEventListener('click', function () {
        apply(b.dataset.set)
      })
    })
    apply(lang)
  })
})()
