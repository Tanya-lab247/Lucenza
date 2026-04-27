(function($) {
    "use strict";

    var cart = JSON.parse(localStorage.getItem('lucenza_cart')) || [];

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
                    0: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    999: { slidesPerView: 3, spaceBetween: 24 },
                },
            });
        });

        var swiper = new Swiper(".review-swiper", {
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-arrow-next',
                prevEl: '.swiper-arrow-prev',
            },
        });
    };

    var updateCartUI = function() {
        var $cartList = $('#cart-list');
        var $cartTotal = $('#cart-total');
        var $cartCounts = $('.cart-count');
        
        $cartList.empty();
        
        if (cart.length === 0) {
            $cartList.append('<li class="list-group-item border-0 d-flex justify-content-between lh-sm empty-cart-msg"><div><h6 class="my-0">Your cart is empty</h6></div></li>');
            $cartTotal.text('₹0');
            $cartCounts.each(function() {
                if ($(this).hasClass('badge')) $(this).text('0');
                else $(this).text('(0)');
            });
            return;
        }

        var total = 0;
        cart.forEach(function(item) {
            var itemTotal = item.price * item.quantity;
            total += itemTotal;
            $cartList.append(
                '<li class="list-group-item border-0 d-flex justify-content-between lh-sm">' +
                '<div><h6 class="my-0">' + item.name + '</h6><small class="text-body-secondary">Qty: ' + item.quantity + '</small></div>' +
                '<span class="text-body-secondary">₹' + itemTotal + '</span>' +
                '</li>'
            );
        });

        $cartTotal.text('₹' + total);
        var totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
        $cartCounts.each(function() {
            if ($(this).hasClass('badge')) $(this).text(totalQty);
            else $(this).text('(' + totalQty + ')');
        });

        localStorage.setItem('lucenza_cart', JSON.stringify(cart));
    };

    var initCart = function() {
        $(document).on('click', '.cart-button a', function(e) {
            e.preventDefault();
            var $product = $(this).closest('.product-item');
            var name = $product.find('.product-detail h3 a').text();
            var priceText = $product.find('.item-price').text();
            var price = parseFloat(priceText.replace(/[^0-9.]/g, ''));

            var existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: name, price: price, quantity: 1 });
            }

            updateCartUI();
        });
    };

    var initContactForm = function() {
        $('#contact-form').on('submit', function(e) {
            e.preventDefault();
            var $form = $(this);
            var $btn = $form.find('button[type="submit"]');
            var originalBtnText = $btn.text();

            $btn.text('Sending...').prop('disabled', true);

            // Simulate form submission
            setTimeout(function() {
                $form.fadeOut(function() {
                    $form.html('<div class="text-center py-5"><h3 class="display-6 text-primary mb-3">Thank You!</h3><p class="fs-4 fw-light">Your message has been sent successfully. We will get back to you soon.</p></div>').fadeIn();
                });
            }, 1500);
        });
    };

    // document ready
    $(document).ready(function () {
        initSearch();
        initSlider();
        initCart();
        updateCartUI();
        initContactForm();
    });

})(jQuery);
