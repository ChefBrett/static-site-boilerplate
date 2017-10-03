document.addEventListener('DOMContentLoaded', function() {
  var lightbox = new Lightbox('.home-lightbox');
  var template = document.querySelector('.home-lightbox .home-lightbox__template');
  var toggle = document.querySelector('.toggle-lightbox');
  toggle.addEventListener('click', function() {
    lightbox.contentInnerHTML(template.innerHTML);
    lightbox.open();
  });
});
