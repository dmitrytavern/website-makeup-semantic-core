import '../sass/app.sass'

/*
*   Common scripts for main page
* */

$(document).ready(function () {
	document.body.classList.add('is-loaded')
})

$(".btn-up").click(function() {
	$("html, body").animate({ scrollTop: 0 }, "slow");
	return false;
});


//  Header

const $header         = $('header')
const $headerMenuBtn  = $('#header-menu-btn')
const $menu           = $('.menu')

function scrollPage() {
	if (window.pageYOffset > 0) {
		$header.addClass('is-scroll')
	} else {
		$header.removeClass('is-scroll')
	}

	if (window.pageYOffset > 300) {
		$(".btn-up").addClass('is-active')
	} else {
		$(".btn-up").removeClass('is-active')
	}

	setTimeout(function () {
		// if (window.innerWidth < 992) $menu.css('padding-top', $header.outerHeight(true))
	}, 300)
}

function toggleHeaderMenu() {
	$headerMenuBtn.toggleClass('is-active')
	$header.toggleClass('is-menu-open')
	$menu.toggleClass('is-open')
	document.body.classList.toggle('menu-opened')
}

$($headerMenuBtn).on('click', toggleHeaderMenu)

$(window).on('resize', scrollPage)
$(window).on('scroll', scrollPage)
scrollPage()


// Sliders

new Swiper('.swiper-container', {
	loop: false,
	effect: 'fade',
	noSwiping: true,
	allowTouchMove: false,
	fadeEffect: {
		crossFade: true
	},
	pagination: {
		el: '.slider__pagination',
		bulletClass: 'slider__bullet',
		bulletActiveClass: 'is-active',
		clickable: true
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
		disabledClass: 'is-disabled'
	},
})


// Collapses

$('.question__answer').on('show.bs.collapse', function () {
	$(this).parent().addClass('is-active');
});

$('.question__answer').on('hide.bs.collapse', function () {
	$(this).parent().removeClass('is-active');
});