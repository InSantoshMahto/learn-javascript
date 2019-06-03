'use strict'
/**
 * @see initiated AOS library
 */
AOS.init({
  offset: 120, // offset (in px) from the original trigger point
  delay: 200, // values from 0 to 3000, with step 50ms
  duration: 1500, // values from 0 to 3000, with step 50ms
});
AOS.refresh({
  offset: 120,
  delay: 200,
  duration: 1500,
});
AOS.refreshHard({
  offset: 120,
  delay: 200,
  duration: 1500,
});

/**
 * @see initiated owl.carousel library
 */
$(document).ready(function() {
  // client feedback
  $('.onsi-feedback').owlCarousel({
    center: true,
    items: 2,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 1500,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      // 600: {
      //   items: 2
      // }
    },
  });

  // showcases
  $('.onsi-showcases').owlCarousel({
    loop: true,
    margin: 10,
    // center: true,
    // autoWidth: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
    },
  });
});

/**
 * @see Swiper
 */
// our services and products
let swiperForProductsAndServices = new Swiper(
  '.swiper-for-products-and-services',
  {
    slidesPerView: 4,
    spaceBetween: 50,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  }
);
