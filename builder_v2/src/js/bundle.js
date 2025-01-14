AOS.init();
(function ($) {
  $(document).ready(function() {
  
  const logos = new Swiper('.logos', {
    speed: 800,
    duration: 2000,
    centeredSlides: false,
    centerInsufficientSlides: true,
    slidesPerView: 5,
    spaceBetween: 30,
    mode: 'horizontal',
    grabCursor: true,
    loop: true,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2.5,
        spaceBetween: 12,
      },
      // when window width is >= 480px
      720: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      // when window width is >= 640px
      840: {
        slidesPerView: 5,
        spaceBetween: 30,
      }
    },
  });
  

  const slider = new Swiper('.slider', {
    speed: 800,
    duration: 2000,
    centeredSlides: false,
    centerInsufficientSlides: true,
    slidesPerView: 2,
    mode: 'horizontal',
    grabCursor: true,
    loop: true,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
      },
      // when window width is >= 480px
      720: {
        slidesPerView: 2,
      },
      // when window width is >= 640px
      840: {
        slidesPerView: 3,
      },
      1280: {
        slidesPerView: 4,
      },
      1520: {
        slidesPerView: 5,
      }
    },
  });
  
// Mobile menu enable
  // Multilevel menu functionality
  $('.mobile-icon-wrapper').click(function(){
    $('.menu-wrap').toggleClass('open');
    $('.mobile-icon').toggleClass('active');
    $('.mobile-menu-wrap').toggleClass('show');
    $('body').toggleClass('mobile-menu-opened');
    $('html').toggleClass('mobile-menu-opened');

    $('.icon-dropdown').click(function () {
      $(this).next('ul').toggleClass('slide');
      $('.nav').toggleClass('slide-back')
    })
    $('.submenu-wrapper').click(function () {
      $('.nav').toggleClass('slide-back')
      $('.drop-menu').removeClass('slide');
    })
  });

  $('.counter').each(function () {
    var $this = $(this),
        countTo = $this.attr('data-count');
    $({
      countNum: $this.text()
    }).animate({
      countNum: countTo
    }, {
      duration: 4000,
      easing: 'linear',
      step: function step() {
        $this.text(Math.floor(this.countNum));
      },
      complete: function complete() {
        $this.text(this.countNum); //alert('finished');
      }
    });
  });

    // FAQ animated
    let sliderOpen = $('.openSlide');
    sliderOpen.hide();
    sliderOpen.eq(0).show();
    $('.questions').on('click', function () {
      let questions = $('.questions');
      questions.next().hide("1000");
      $('.active').find('.icon').removeClass("rotate-180");
      let dataNo = $(this).attr('data-no');
      let xy = $(this);
      $('.content').each(function() {
        let eachdatano = $(this).attr('data-no');
        if (dataNo == eachdatano) {
          xy.next().slideToggle();
          xy.addClass('active');
          xy.find('.icon').toggleClass("rotate-180");
        }
      })
    })
  });

   const convertImages = (query, callback) => {
    const images = document.querySelectorAll(query);
  
    images.forEach(image => {
      fetch(image.src)
      .then(res => res.text())
      .then(data => {
        const parser = new DOMParser();
        const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');
  
        if (image.id) svg.id = image.id;
        if (image.className) svg.classList = image.classList;
  
        image.parentNode.replaceChild(svg, image);
      })
      .then(callback)
      .catch(error => console.error(error))
    });
  }
  
  convertImages('img.injectable');
})(jQuery);