
(function () {

  // Preloader Code
  var count = 0;
  var revert = false;

  setInterval(function () {
    var calc = -(500 * count);

    if (count < 30 && !revert) {
        count++;
    } else if (count > 10) {
        count--;
        if (count > 10) {
            revert = true;
        } else {
            revert = false;
        }
    } else if (count === 1 && revert) {
        revert = false;
    }
    $('#image').css('margin-left', calc);
  }, 80);

  // Loading Window

  $(window).on('load', function () {
    setTimeout(function () {
      $('.preloader').addClass('hide');
    }, 1000);
  });

  // Menu Click
  $( "#jsMenuClick" ).click(function() {
    if($(this).hasClass('clicked')) {
      $(this).removeClass('clicked');
      $('#siteNav').removeClass('open');
      $('.wrapper-menu').removeClass('open');
      $('.bm-header-logo').removeClass('hide');
    }else {

      $('#siteNav').addClass('open');
      $('.wrapper-menu').addClass('open');
      $('.bm-header-logo').addClass('hide');
      setTimeout(function(){
       $('#jsMenuClick').addClass('clicked');
     }, 500);
    }
  });

  // Countdown
  $('.counter').find('.counter-group').each(function(el) {
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;

    let countDown = new Date('Dec 25, 2018 14:00:00').getTime();


    x = setInterval(function() {
      let now = new Date().getTime(),
        distance = countDown - now;

        document.getElementById('days').innerText = Math.floor(distance / (day)),
        document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

      if (distance < 0) {
        $('#time-counter').hide();
        $('#youtube-live').show();
      }

    }, second)
  });

  //  Team Slider
  $('.hero_slider_img_group').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    // fade: true,
    arrows: false,
    autoplaySpeed: 2000,
    cssEase: 'linear'
  });

  $(window).scroll(function () {
      var pos = $(window).scrollTop();

      if (pos > 100) {
        $('.scroll-btn').hide();
      }else {
        $('.scroll-btn').show();
      }
    });


})();
