////////////////////////////////////////////////
// Image caching
//
(function($, window, document, undefined) {

  var prefix = "";
  var imgCache = [
      prefix + "/images/about-bg.jpg",
      prefix + "/images/artisan-entrance.jpg",
      prefix + "/images/artisan.jpg",
      prefix + "/images/bg01.jpg",
      prefix + "/images/bg02.jpg",
      prefix + "/images/birth.jpg",
      prefix + "/images/cafes.jpg",
      prefix + "/images/closebox.png",
      prefix + "/images/control.jpg",
      prefix + "/images/fatherson.jpg",
      prefix + "/images/flight447.jpg",
      prefix + "/images/futurelab.jpg",
      prefix + "/images/ladiesdetective.jpg",
      prefix + "/images/lagiaconda.jpg",
      prefix + "/images/lostcontrol.jpg",
      prefix + "/images/monceau.jpg",
      prefix + "/images/moreless.jpg",
      prefix + "/images/morewithless.jpg",
      prefix + "/images/mu15.jpg",
      prefix + "/images/namjune.jpg",
      prefix + "/images/noderugs.jpg",
      prefix + "/images/olympia.jpg",
      prefix + "/images/pearson-pods.jpg",
      prefix + "/images/showreel.jpg",
      prefix + "/images/slanted.jpg",
      prefix + "/images/supernature.jpg",
      prefix + "/images/thalia.jpg",
      prefix + "/images/tourderance.jpg",
      prefix + "/images/uniqlo.jpg",
      prefix + "/images/yes.jpg",
      prefix + "/data/works.json"
  ];
  
  var queue = new createjs.LoadQueue();

  var CacheImages = {
    init: function() {
      CacheImages.bindHandlers();
      queue.loadManifest(imgCache);
    },
    
    bindHandlers: function() {
      queue.on("complete", CacheImages.handleComplete, this);
      queue.on("progress", CacheImages.handleProgress, this);
      queue.on("loadstart", CacheImages.handleLoadStart, this);     
    },
    
    handleLoadStart: function() {
      var htmlProgress = '' +
        '<div class="progress">' +
          '<h4>Loading</h4>' +
          '<div class="progress-bar">' +
            '<div class="progress-load"></div>' +
          '</div>' +
        '</div>'; 
      $('body').append(htmlProgress);
    },
    
    handleProgress: function(e) {
      var progressWidth = e.progress * 100;
      $('.progress-load').css('width', progressWidth + '%' );
    },
    
    handleComplete: function() {
      $('.progress').remove();

      // If home show splash screen
      var path = window.location.pathname;
      path = path.replace(/\/$/, '');
      var pathAry = path.split('/');
      if (pathAry[pathAry.length-1] !== "about" && pathAry[pathAry.length-1] !== "contact") {
        var html = '' +
          '<div class="landing-bg">' +
            '<div class="landing">' +
              '<h1>ART TYPE</h1>' +
              '<h2>Work By <span>Steve Smith</span></h2>' +
              '<button class="button-primary">Explore</button>' +
            '</div>' +
          '</div>';
        $('body').prepend(html);
        $('.landing > button').on('click', CacheImages.handleLandingBtn);
        $('.landing-bg')
          .css({ left: '50%', right: '50%' })
          .show()
          .transition({ left: 0, right: 0 }, 500, 'easeInOutQuad');
        $('.landing')
          .css({'opacity': '0', y: '20px'})
          .show()
          .transition({ opacity: '1', y: '0', delay: 400 });
        return;
      }
      // Non home screen animations
      $('header')
        .css({ display: 'block', y: '-100px' })
        .transition({ y: '0' });
      $('footer')
        .css({ display: 'block', y: '100px' })
        .transition({ y: '0' });
      $('.main').show();
      $('.about-splash')
        .css({ display: 'block', height: '0' })
        .transition({ height: '250px', delay: 200 });
      $('.main-index, .main-about, .main-contact')
        .css({ display: 'block', opacity: '0', y: '20px' })
        .transition({ opacity: '1', y: '0', delay: 600 });
    },
    
    handleLandingBtn: function() { 
      $('.landing-bg, .landing')
        .transition({ scale: '1.3, 1.3', opacity: '0' }, 800, function() {
          $(this).remove();
      });
      $('header')
        .css({ display: 'block', y: '-100px' })
        .transition({ y: '0', delay: 500 });
      $('footer')
        .css({ display: 'block', y: '100px' })
        .transition({ y: '0', delay: 500 });
      $('.main')
        .css({ display: 'block', opacity: '0', y: '20px' })
        .transition({ opacity: '1', y: '0', delay: 300 });
    }
    
  };
  
  CacheImages.init();

})(jQuery, window, document);
