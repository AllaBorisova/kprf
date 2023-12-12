Fancybox.bind('[data-fancybox]', {});

jQuery(document).ready(function ($) {
  $('.tabs').lightTabs();

  $('[type=tel]').mask('+7 (999) 999-99-99');

  $('.sub-menu-link > a').click(function (e) {
    e.preventDefault();
    if ($(this).parent().hasClass('open')) {
      $('.sub-menu-link').removeClass('open');
    } else {
      $('.sub-menu-link').removeClass('open');
      $(this).parent().addClass('open');
      $('body').addClass('open-menu');
    }
  });

  // window.addEventListener('click', function (e) {
  //   if (!menu.contains(e.target) && !button.contains(e.target)) {
  //     // Ниже код, который нужно выполнить при срабатывании события.
  //     menu.classList.add('hide');
  //   }
  // });
  $(document).mouseup(function (e) {
    const container = $('.nav-menu');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $('.sub-menu-link').removeClass('open');
      if (!$('.hamburger').hasClass('is-active')) {
        $('body').removeClass('open-menu');
      }
    }
  });

  $('.hamburger').click(function () {
    $('.hamburger').toggleClass('is-active');
    $('body').toggleClass('open-menu');
  });

  $('.main-slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: false,

          slidesToShow: 1,
          variableWidth: false,
        },
      },
    ],
  });

  // $('.main-slider').slick({
  //   centerMode: true,
  //   centerPadding: '60px',
  //   slidesToShow: 1,
  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         arrows: false,
  //         centerMode: true,
  //         centerPadding: '40px',
  //         slidesToShow: 3,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         arrows: false,
  //         centerMode: true,
  //         centerPadding: '40px',
  //         slidesToShow: 1,
  //       },
  //     },
  //   ],
  // });

  // $('.slider-for').slick({
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   fade: true,
  //   asNavFor: '.slider-nav',
  // });
  // $('.slider-nav').slick({
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   asNavFor: '.slider-for',
  //   dots: false,
  //   arrows: true,
  //   centerMode: true,
  //   centerPadding: '0px',
  //   focusOnSelect: true,
  //   vertical: true,
  //   prevArrow:
  //     '<button type="button" class="slick-prev-recomm"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg></button>',
  //   nextArrow:
  //     '<button type="button" class="slick-next-recomm"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg></button>',
  //   // prevArrow: '',
  //   // nextArrow: '',
  //   responsive: [
  //     {
  //       breakpoint: 993,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 769,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         vertical: false,
  //       },
  //     },
  //     {
  //       breakpoint: 481,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // });
});
