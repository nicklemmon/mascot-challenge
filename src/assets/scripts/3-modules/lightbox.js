var Lightbox = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$lightboxOpen = $('.lightbox__open');
    this.$lightboxClose = $('.lightbox__close');
    this.$lightbox = $('.lightbox');
    this.$overlay = $('.overlay');
    this.$body = $('body');
  },
  openLightbox: function() {
    this.$lightbox
      .removeClass('is-invisible')
      .addClass('is-visible');

    this.$overlay
      .removeClass('is-invisible')
      .addClass('is-visible');

    this.$lightbox.attr('aria-hidden', 'false');
  },
  closeLightbox: function() {
    this.$lightbox
      .removeClass('is-visible')
      .addClass('is-invisible');

    this.$overlay
      .removeClass('is-visible')
      .addClass('is-invisible');

    this.$lightbox.attr('aria-hidden', 'true');
  },
  disableScrolling: function() {
    this.$body.addClass('u-overflow--hidden');
  },
  enableScrolling: function() {
    this.$body.removeClass('u-overflow--hidden');
  },
  bindEvents: function() {
    this.$lightboxOpen.on('click', function() {
      Lightbox.openLightbox();
      Lightbox.disableScrolling();
    });

    this.$lightboxClose.on('click', function() {
      Lightbox.closeLightbox();
      Lightbox.enableScrolling();
    });
  }
}
