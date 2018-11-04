
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

    let countDown = new Date('Nov 1, 2018 00:00:00').getTime();


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
  $('.team-slider').find('.slider-group').each(function(el) {
    $('.slider-group').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  });

  // Registration form
  var current_fs,
      next_fs,
      previous_fs;

  var left,
      opacity,
      scale;

  var animating;

  $(".next").click(function(){
  	if(animating) return false;
  	animating = true;

  	current_fs = $(this).parent();
  	next_fs = $(this).parent().next();

    var valid = true,
        message = '';

        $('.form-section.first').find('input').each(function(){
          var $this = $(this);

          if(!$this.val()) {
            var inputName = $this.attr('name');
            valid = false;
            message += 'Please enter your' + inputName + '\n';
          }
        });

        if(!valid) {
          alert(message);
        } else {
          $("#progressbar li").eq($(".form-section").index(next_fs)).addClass("active");

        	//show the next fieldset
        	next_fs.show();
        	//hide the current fieldset with style
        	current_fs.animate({opacity: 0}, {
        		step: function(now, mx) {
        			//as the opacity of current_fs reduces to 0 - stored in "now"
        			//1. scale current_fs down to 80%
        			scale = 1 - (1 - now) * 0.2;
        			//2. bring next_fs from the right(50%)
        			left = (now * 50)+"%";
        			//3. increase opacity of next_fs to 1 as it moves in
        			opacity = 1 - now;
        			current_fs.css({
                'transform': 'scale('+scale+')',
                'position': 'absolute'
              });
        			next_fs.css({'left': left, 'opacity': opacity});
        		},
        		duration: 800,
        		complete: function(){
        			current_fs.hide();
        			animating = false;
        		},
        		//this comes from the custom easing plugin
        		easing: 'easeInOutBack'
        	});
        }
  });


  $(".previous").click(function(){
  	if(animating) return false;
  	animating = true;

  	current_fs = $(this).parent();
  	previous_fs = $(this).parent().prev();

  	//de-activate current step on progressbar
  	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

  	//show the previous fieldset
  	previous_fs.show();
  	//hide the current fieldset with style
  	current_fs.animate({opacity: 0}, {
  		step: function(now, mx) {
  			//as the opacity of current_fs reduces to 0 - stored in "now"
  			//1. scale previous_fs from 80% to 100%
  			scale = 0.8 + (1 - now) * 0.2;
  			//2. take current_fs to the right(50%) - from 0%
  			left = ((1-now) * 50)+"%";
  			//3. increase opacity of previous_fs to 1 as it moves in
  			opacity = 1 - now;
  			current_fs.css({'left': left});
  			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
  		},
  		duration: 800,
  		complete: function(){
  			current_fs.hide();
  			animating = false;
  		},
  		//this comes from the custom easing plugin
  		easing: 'easeInOutBack'
  	});
  });

  $(".submit").click(function(){
  	return false;
  })

  // add css class to p tags in about page
  $(document).ready(function () {
    $('.container .section-row p').addClass('site-paragraph-01')
    $('.ceo .container p').addClass('ceo-txt')
  });

  //participants Load More
  let currentPage = 1;
  var totalPages = eval($('#page-count-hidden').attr('value'));
  var participantsId = eval($('#participants-id-hidden').attr('value'));

  $('#load-mode-participants-btn').click(function () {
    currentPage += 1;
    if (currentPage == totalPages) {
        $('#load-mode-participants-btn').hide();
    }
    $('#participants-content').append('<div id="participants-content-' + currentPage + '">');
    $('#participants-content-' + currentPage).load('/umbraco/Surface/Particpants/RenderTeams/' + participantsId + '?pageSize=2&page=' + currentPage);

  });

  $(window).scroll(function () {
      var pos = $(window).scrollTop();

      if (pos > 100) {
        $('.scroll-btn').hide();
      }else {
        $('.scroll-btn').show();
      }
    });

  $('.live-counter-wrapper iframe').attr('src', 'http://flagday.securepath.ae/');

  // JQUERY UI
  $(".register-date-picker").attr('value', '');
  $( ".register-date-picker" ).datepicker({
      changeMonth: true,
      changeYear: true
    });


})();
