import Swiper from "swiper";
import {
  Autoplay,
  Grid,
  Mousewheel,
  Navigation,
  Pagination,
  EffectFade,
} from "swiper/modules";

/**
 * @param swiperInit
 */
export function swiperInit() {
  $(".swiper-column-auto").each(function (index) {
    const $this = $(this);
    // Configuration flagsvideoSetting
    const config = {
      loop: $this.hasClass("swiper-loop"),
      touchMove: $this.hasClass("allow-touchMove") || true,
      mouseWheel: $this.hasClass("allow-mouseWheel")
        ? { forceToAxis: true }
        : false,
      autoHeight: $this.hasClass("auto-height"),
      hasVideo: $this.hasClass("auto-detect-video"),
      progressbar: $this.hasClass("progressbar"),
      time: $this.attr("data-time") || 3500,
      autoplay: $this.hasClass("autoplay"),
    };

    // Add unique identifier class
    $this.addClass(`swiper-column-auto-id-${index}`);

    // Create swiper with optimized options
    new Swiper(`.swiper-column-auto-id-${index} .swiper`, {
      modules: [Navigation, Pagination, Mousewheel],
      speed: 500,
      observer: true,
      observeParents: true,
      spaceBetween: 0,
      loop: config.loop,
      ...(config.autoplay && {
        autoplay: {
          delay: config.time,
        },
      }),
      slidesPerView: "auto",
      pagination: {
        el: `.swiper-column-auto-id-${index} .swiper-pagination`,
        clickable: true,
        ...(config.progressbar && {
          type: "progressbar",
        }),
      },
      mousewheel: config.mouseWheel,
      allowTouchMove: config.touchMove,
      navigation: {
        prevEl: `.swiper-column-auto-id-${index} .btn-prev`,
        nextEl: `.swiper-column-auto-id-${index} .btn-next`,
      },
      watchSlidesProgress: true,
      autoHeight: config.autoHeight,
      on: {
        init: function () {},
        slideChange: function () {},
      },
    });
  });
  new Swiper(".section-home-banner .swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 3500,
    },
    modules: [Pagination, Navigation, Autoplay, EffectFade],
    pagination: {
      el: ".section-home-banner .swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        const slide = this.slides[index];
        const title = slide.getAttribute("data-title") || `Slide ${index + 1}`;
        return `<span class="${className}">${title}</span>`;
      },
    },
    navigation: {
      nextEl: ".section-home-banner .btn-next",
      prevEl: ".section-home-banner .btn-prev",
    },
  });

  // Initialize Swiper for home-1-slider
  const home1SliderTexts = [
    "Tiền thân là Xí nghiệp Kết cấu thép với chức năng chính là cung cấp các dịch vụ xây lắp công nghiệp đầu khí cho các dự án khai thác, vận chuyển, tàng trữ và chế biến dầu khí.",
    "Phàm nhân tu tiên (Nhân giới) ",
    "Phàm nhân  tu tiên (Linh giới",
    "Phàm nhân tu tiên chi tiên giới thiên",
  ];

  // Helper function to adjust text position based on its character count
  function adjustSlideTextPosition(slide) {
    const slideText = $(slide).find(".slide-text");
    if (slideText.length) {
      const textContent = slideText.text();
      const characterCount = textContent.length;
      const threshold = 60; // Character count threshold

      if (characterCount < threshold) {
        // If text is short (< 60 chars), move it closer to the pagination
        slideText.css("bottom", "40px");
      } else {
        // If text is long (>= 60 chars), move it up
        slideText.css("bottom", "130px");
      }
    }
  }

  const home1Swiper = new Swiper(".home-1-slider .swiper-container", {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    on: {
      init: function (swiper) {
        // Set text for all slides
        swiper.slides.forEach((slide, index) => {
          const textIndex = index % home1SliderTexts.length;
          $(slide).find(".slide-text").text(home1SliderTexts[textIndex]);
          // Adjust position for every slide
          adjustSlideTextPosition(slide);
        });
        // Handle custom pagination
        const paginationItems = $(".home-1-pagination .pagination-item");
        paginationItems.eq(swiper.realIndex).addClass("active");
      },
      slideChange: function (swiper) {
        // The text is already set on init, but we need to re-adjust for looped slides
        const currentSlide = swiper.slides[swiper.activeIndex];
        const textIndex = swiper.realIndex % home1SliderTexts.length;
        $(currentSlide).find(".slide-text").text(home1SliderTexts[textIndex]);

        // Adjust position for the new active slide
        adjustSlideTextPosition(currentSlide);

        // Handle custom pagination
        const paginationItems = $(".home-1-pagination .pagination-item");
        paginationItems.removeClass("active");
        paginationItems.eq(swiper.realIndex).addClass("active");
      },
    },
  });

  // Add click event for custom pagination
  $(".home-1-pagination .pagination-item").on("click", function () {
    const index = $(this).index();
    home1Swiper.slideToLoop(index);
  });

  // Initialize Swiper for home-3-slider
  new Swiper(".home-3-slider .swiper-container", {
    modules: [Navigation, Autoplay],
    loop: true,
    speed: 1000,
    spaceBetween: 30, // Khoảng cách giữa các card
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".home-3-slider .swiper-button-next",
      prevEl: ".home-3-slider .swiper-button-prev",
    },
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 4, // Hiển thị 4 card trên màn hình lớn
        spaceBetween: 30,
      },
    },
  });

  // Initialize Swiper for home-4-slider
  new Swiper(".home-4-slider", {
    modules: [Navigation, Autoplay],
    loop: true,
    speed: 600,
    slidesPerView: 4,
    centeredSlides: false,
    spaceBetween: 0,
  });
}
