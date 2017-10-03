function Lightbox(selector) {
  var lightbox = document.querySelector(selector + ' .lightbox');
  var lightboxClose = document.querySelector(selector + ' .lightbox__close');
  var lightboxContent = document.querySelector(selector + ' .lightbox__content');
  this.lightbox = lightbox;
  this.lightboxClose = lightboxClose;
  this.lightboxContent = lightboxContent;

  if(lightbox) {
    this.toggle = function() {
      lightbox.classList.contains('hide')
        ? lightbox.classList.remove('hide')
        : lightbox.classList.add('hide');
    }

    this.open = function() {
      lightbox.classList.remove('hide');
    }

    this.close = function() {
      lightbox.classList.add('hide');
    }

    this.contentInnerHTML = function(html) {
      lightboxContent.innerHTML = html;
    }

    lightboxClose.addEventListener('click', this.close);

  }
  return this;
}
