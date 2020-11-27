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

// Modals

$('.modal').on('show.bs.modal', function () {
	$('.modal-custom-backdrop').addClass('is-open')
})

$('.modal').on('hide.bs.modal', function () {
	$('.modal-custom-backdrop').removeClass('is-open')
})

$('.modal-custom-backdrop').on('click', function () {
	$('.modal').modal('toggle')
})


// Working with form


$('form input').on('focus', function () {
	$(this).removeClass('is-error')
})

function activateError(el, name) {
	$(`${el} input[name="${name}"]`).addClass('is-error')
}

function checkInputRequired(el, name) {
	return $(`${el} input[name="${name}"]`).attr('data-required')
}

function checkFormData(el, data) {
	let error = false
	for (let { name, value } of data) {
		if (value === '') {
			if (checkInputRequired(el, name) !== undefined) {
				error = true
				activateError(el, name)
			}
		}
	}

	return error
}

function normalizeFormData(data) {
	let obj = {}
	for (let { name, value } of data) {
		obj[name] = value
	}

	return obj
}

// Form in modal
$('#modal-order-form').submit(function (e) {
	e.preventDefault()
	const data = $(this).serializeArray()

	if (!checkFormData('#modal-order', data)) {
		const normData = normalizeFormData(data)
		$('#modal-order .modal__tab').removeClass('is-active')
		$('#modal-order .modal__tab[data-name="success"]').addClass('is-active')
		$.ajax({
			url: '/callback',
			method: 'POST',
			dataType: 'JSON',
			data: {
				address: normData.site,
				contact: normData.contact,
				examples: normData.examples,
				count: normData.count,
				fromKnow: normData.fromKnow
			}
		})
			.done(function () {
				$('#modal-order .modal__tab').removeClass('is-active')
				$('#modal-order .modal__tab[data-name="success"]').addClass('is-active')
			})
			.fail(function (res) {
				const $errorText = $('#modal-order-form .form-error-text')
				$errorText[0].innerHTML = res.message || 'Has Error'
				$errorText.addClass('is-active')

				setTimeout(function () {
					$('#modal-order-form .form-error-text').removeClass('is-active')
				}, 3000)
			})
	}
})
