(function($, window, document, undefined) {
  var prefix = "";

  ////////////////////////////////////////////////
  // pjax logic
  //
  $(document).on('click touchend', '.nav-main a', function(e) {
    $.pjax.click(e, '.main', { fragment: '.main', timeout: 4000 });
  });

  $(document).on('pjax:success', function() {
  
    // Changing body class
    $body = $('body');
    var path = window.location.pathname;
    path = path.replace(/\/$/, '');
    var pathAry = path.split('/');
    switch(pathAry[pathAry.length - 1]) {
      case "about":
        $body.removeClass().addClass('about'); 
        break;
      case "contact":
        $body.removeClass().addClass('contact'); 
        break;
      default:
        $body.removeClass().addClass('index'); 
    }
    
    // Fade in page components
    $('.main').show();
    $('.about-splash')
      .css({ display: 'block', height: '0' })
      .transition({ height: '250px', delay: 400 });
    $('.main-index, .main-about, .main-contact')
      .css({ display: 'block', opacity: '0', y: '20px' })
      .transition({ opacity: '1', y: '0', delay: 800 });
  });





   
  //////////////////////////////////////////////// 
  // .nav-main hover animation
  //
  $('.nav-main-ul > li').on('mouseenter', function() {
    $(this).find('a').css({'top': '10px', 'opacity': '0.0'});
    $(this).find('a').animate({
      top: '0',
      opacity: '1'
    }, 200);
  });





  //////////////////////////////////////////////// 
  // .nav-filter animation
  //
  $('.nav-main-ul > li:first-child').on('click touchend', function() {
    $('.nav-filter')
      .css({ 'display': 'block', 'y': '-70px'})
      .transition({ y: 0 });
  });
  // close filter box
  $('.nav-filter-ul + span').on('click', function() {
    $('.nav-filter')
      .transition({ 'y': '-70px' }, function() {
        $('.nav-filter').css('display', 'none');
    });
  });
  // if mouse up outside of filter box, close div
  $(document).mouseup(function (e) {
    if ( $('.nav-filter').is(':visible') ) {
      var container = $('.nav-filter');

      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.nav-filter')
          .transition({ 'y': '-70px' }, function() {
            $('.nav-filter').css('display', 'none');
        });
      }
    }
  });



  //////////////////////////////////////////////// 
  // .nav-filter logic
  //
  $('.nav-filter-ul > li').on('click', function() {
    var tag = $(this).data('name');

    $('.main-index').empty();
    
    $.ajax({
      url: prefix + '/data/works.json',
      type: 'get',
      dataType: 'json',
      success: function( data ) {
        var html = '';
        $.each(data.work, function(i, val) {
          if (val.tag === tag || tag === 'none') {
            html += '' +
              '<div class="artwork">' +
                '<figure>' +
                  '<figcaption>' + val.caption + '</figcaption>' +
                  '<img src="' + prefix + '/images/' + val.img + '" alt="">' +
                '</figure>' +
              '</div>';
          }
        });
				// Fade in pictures
        $('.main-index')
          .css({ opacity: 0, y: '20px' })
          .html( html )
          .transition({ opacity: 1, y: '0' }); 
      },
      error: function() {
      }
    });
  });









  //////////////////////////////////////////////// 
  // .nav-side animation
  //
  $('.nav-side > ul > li').on({
    mouseenter: function() {
      $(this).animate({top: '5px'}, 150)
    },
    mouseleave: function() {
      $(this).animate({top: '10px'}, 100)
    }
  });

})(jQuery, window, document);
