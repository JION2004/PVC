import { headerSearch } from "../../plugins/ComponentsUi/HeaderSearch/HeaderSearch";
import { detectCloseElement } from "./helper";
/*==================== Header ====================*/
/**
 * @param header
 */
const vw = $(window).width();
export const header = {
	scrollActive: function () {
		let height = $("header").height();
		if ($(window).scrollTop() > height) {
			$("header").addClass("active");
		} else {
			$("header").removeClass("active");
		}
	},
	mobile: function () {
		const hamburger = $(".js-toggle-menu");
		const mobileContainer = $(".header-mobile");

		// --- Open Menu Logic ---
		hamburger.on("click", function () {
			$(this).toggleClass("active");
			mobileContainer.toggleClass("is-open");
		});

		// --- Close Menu Logic (using event delegation for robustness) ---
		$(document).on("click", ".mobile-overlay, .mobile-menu-list .close-btn", function () {
			hamburger.removeClass("active");
			mobileContainer.removeClass("is-open");
		});

		// --- Dropdown Submenu Logic (using event delegation for robustness) ---
		$(document).on("click", ".mobile-menu-list .has-dropdown .dropdown-toggle", function() {
			$(this).closest(".has-dropdown").toggleClass("open");
		});
	},
	initVariable: function () {
		const height = $("header").height();
		document.documentElement.style.setProperty("--header-height", `${height}px`);
	},
	init: function () {
		headerSearch();
		header.scrollActive();
		header.mobile();
		header.initVariable();
	},
};
document.addEventListener(
	"scroll",
	function (e) {
		header.scrollActive();
	},
	true
);
