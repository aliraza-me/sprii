
(function () {
  // Loading Window

  $(window).on('load', function () {
    setTimeout(function () {
      $('.preloader').addClass('hide');
    }, 1000);
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

        document.getElementById('days2').innerText = Math.floor(distance / (day)),
        document.getElementById('hours2').innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById('minutes2').innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById('seconds2').innerText = Math.floor((distance % (minute)) / second);

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
    arrows: false,
    autoplaySpeed: 2000,
    cssEase: 'linear'
  });

  // poup Appear on mouce leave

  document.addEventListener("mouseleave", function(event){
    if(event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight))
    {
       if(!$('.action_popup').hasClass('show')) {
         $('.action_popup').addClass('show');
       }
    }
  });

  $('#btnNotify').click(function(){
    if(!$('.action_popup').hasClass('show')) {
      $('.action_popup').addClass('show');
    }
  });

  // Popup close

  $('#popupClose').click(function(){
    $('.action_popup').removeClass('show');
  });



})();
