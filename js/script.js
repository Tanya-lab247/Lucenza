(function($) {

    "use strict";
      

    var initSearch = function() {
        $(".user-items .search-item").click(function(){
            $(".search-box").toggleClass('active');
            $(".search-box .search-input").focus();
          });
          $(".close-button").click(function(){
            $(".search-box").toggleClass('active');
        });

      };
        

        var initSlider = function() {

          $('.product-carousel').each(function(){
            var sectionId = $(this).attr('id');
            var swiper = new Swiper( "#" + sectionId + " .swiper", {
              slidesPerView: 4,
              spaceBetween: 24,
              pagination: {
                el: "#" + sectionId + " .swiper-pagination",
                clickable: true,
              },
              breakpoints: {
                0: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                999: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              },
            });
          })

            var swiper = new Swiper(".review-swiper", {
              spaceBetween: 30,
              navigation: {
                nextEl: '.swiper-arrow-next',
                prevEl: '.swiper-arrow-prev',
              },
          });

        };

        // document ready
        $(document).ready(function () {
            initSearch();
            initSlider();
          }); // document ready
        
})(jQuery);