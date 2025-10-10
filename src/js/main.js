import AOS from "aos";
import lozad from "lozad";
import {
  setBackgroundElement,
  detectCloseElement,
  buttonToTop,
  clickScrollToDiv,
  appendCaptchaASP,
  menuSpy,
  stickElementToEdge,
} from "./helper";
import { header } from "./header";
import { swiperInit } from "./swiper";
$(document).ready(function () {
  setBackgroundElement();
  stickElementToEdge();
  menuSpy();
  header.init();
  swiperInit();
  clickScrollToDiv('.fix a', () => document.documentElement.style.getPropertyValue('--header-height').replace('px', ''));

  const sections = ['#home-1', '#home-2', '#home-3', '#home-4', '#home-5'];
  const dots = $('.fix a');

  $(window).on('scroll', function() {
    const scrollPosition = $(window).scrollTop();
    const headerHeight = parseFloat(document.documentElement.style.getPropertyValue('--header-height') || 0);

    let activeSection = null;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = $(sections[i]);
      if (section.length && section.offset().top <= scrollPosition + headerHeight + 100) {
        activeSection = sections[i];
        break;
      }
    }

    dots.removeClass('active');
    if (activeSection) {
      $(`.fix a[href="${activeSection}"]`).addClass('active');
    }
  });
});

/*==================== Aos Init ====================*/
AOS.init({
  offset: 100,
});
/*==================== Lazyload JS ====================*/
const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();

window.lozad = observer.observe();
