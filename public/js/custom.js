 jQuery(document).ready(function() {

         setTimeout(function(){
          $('#preloader').fadeOut('slow',function(){$(this).hide();});
         }, 5000);

        function preload(arrayOfImages) {
            jQuery(arrayOfImages).each(function() {
                jQuery('<img/>')[0].src = this
            })
        }
        // SP END
        preload(['img/a.png']);
        var horseCont = 0;
        var horseWidth = 500;
        var horseNos = 83;
        var horseSpeed = 100;
        var horseImg = jQuery('#image').find('img');
        var horseAnimation = setInterval(horseMove, horseSpeed);

        function horseMove() {
            horseImg.css('margin-left', -1 * (horseCont * horseWidth) - 32);
            horseCont++;
            if (horseCont == horseNos) {
                horseImg.css('margin-left', 0);
                horseCont = 0
            }
        }





        //home animation
        var s1 = document.getElementById("shape1");
var s2 = document.getElementById("shape2");
var s3 = document.getElementById("shape3");
var tl = new TimelineMax({repeat:-1, yoyo: true});

tl
.set(s1, {css: {fill: "#fff"}})
.set(s2, {css: {fill: "none"}})
.set(s3, {css: {fill: "none"}})

.to(s1, 1, {morphSVG: s2, ease: Power0.easeNone})
.to(s1, 1, {morphSVG: s3, ease: Power0.easeNone})

    });



   $(window).scroll(function() {
            var newLocation = $(document).scrollTop();
            var scaleLocation = newLocation > 1500 ? 6000 : newLocation;
            var newScale = 1 + (scaleLocation / 900);

               updatePositions(newScale);
           var s = skrollr.init();

        });

     var boxElement = $('#snakeCoil');
        $slide = $('.home1');
        $window = $(window);
        var updatePositions = function(box) {

            winH = $window.height()*3;
            if (winH <= 550) {
                winH = 550;
            }
            $slide.height(winH);
            boxElement.css({
                "transform": "scale(" + box + ")"
            });
        }
