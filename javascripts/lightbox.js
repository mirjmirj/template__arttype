// Lightweight lightbox -- using CSS3 transitions
// Author: Lucien Mirabeau
//

(function($, window, document, undefined) {

  var LightBox = {
    
    el: {
      doc:              $(document),
      body:             $('body'),
      lightboxWrapper:  $('.main')
    },

    init: function() {
      LightBox.bindUIActions();      
    },

    bindUIActions: function() {
      LightBox.el.lightboxWrapper.on('click', 'img', LightBox.addLightbox); 
      LightBox.el.doc.on('mouseup touchend', LightBox.removeLightbox);
    },

    addLightbox: function() {
      var lightboxLink = $(this).attr('src');
      lightboxLink = lightboxLink.slice(0, -4) + '-large.jpg';

      // if you change html you MUST change container in removeLightbox
      $('body').prepend('' +
        '<div class="lightbox">' +
          '<div class="lightbox-content">' +
            '<figure>' +
              '<img class="lightbox-img" src="' + lightboxLink + '" alt="">' +
            '</figure>' +
            '<span class="lightbox-close">X</span>' +
          '</div>' +
        '</div>');
    },

    removeLightbox: function(e) {
      var container = $('.lightbox-img');

      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.lightbox')
          .transition({ scale: '1.3, 1.3', opacity: '0',  }, function() {
            $('.lightbox').remove();
        });     
      } 
    }
  };

  LightBox.init();

})(jQuery, window, document);
