/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }


/*
*   Common scripts for main page
* */

$(document).ready(function () {
  document.body.classList.add('is-loaded');
});
$(".btn-up").click(function () {
  $("html, body").animate({
    scrollTop: 0
  }, "slow");
  return false;
});
$("a[href*='#anchor-']").on('click', function (event) {
  if (this.hash !== "") {
    event.preventDefault();
    var hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top - 150
    }, 800);
  }
});

//  Scrolling

var $header = $('header.header');
var $headerMenuBtn = $('#header-menu-btn');
var $menu = $('.menu');
var $pinBlock = $('#prices-pin-block');
var $pinContainer = $('#prices-pin-container');
var $footer = $('footer.footer');
var $btnChatContainer = $('.btn-fixed-container');
var $btnChat = $('.btn-fixed');
function scrollPage() {
  if (window.pageYOffset > 0) {
    $header.addClass('is-scroll');
  } else {
    $header.removeClass('is-scroll');
  }
  if (window.pageYOffset > 300) {
    $(".btn-up").addClass('is-active');
  } else {
    $(".btn-up").removeClass('is-active');
  }
  if (window.innerWidth < 992) {
    var footerHeight = $footer.height();
    var footerTop = $footer.offset().top;
    var btnChatHeight = $btnChat.height();
    if (footerTop <= window.pageYOffset + window.innerHeight - btnChatHeight / 2 - 30) {
      $btnChatContainer.css({
        bottom: footerHeight + 'px'
      });
      $btnChatContainer.addClass('is-absolute');
      $btnChat.addClass('is-fixed');
    } else {
      $btnChatContainer.css({
        bottom: '30px'
      });
      $btnChatContainer.removeClass('is-absolute');
      $btnChat.removeClass('is-fixed');
    }
  }
  var pinContainerTop = $pinContainer.offset().top;
  var pinContainerHeight = $pinContainer.height();
  var pinEnd = pinContainerTop + pinContainerHeight - $pinBlock.height() - $header.height() - 40;
  if (window.pageYOffset >= pinContainerTop - $header.height() - 40) {
    if (window.pageYOffset >= pinEnd) {
      $pinBlock.removeClass('is-fixed');
      $pinBlock.addClass('is-fixed-bottom');
      $pinBlock.css({
        top: 'unset'
      });
    } else {
      $pinBlock.addClass('is-fixed');
      $pinBlock.removeClass('is-fixed-bottom');
      $pinBlock.css({
        top: window.pageYOffset - pinContainerTop + $header.height() + 40
      });
    }
  } else {
    $pinBlock.removeClass('is-fixed');
    $pinBlock.removeClass('is-fixed-bottom');
    $pinBlock.css({
      top: 0
    });
  }
  setTimeout(function () {
    if (window.innerWidth < 992) $menu.css('padding-top', $header.outerHeight(true));
  }, 300);
}
function toggleHeaderMenu() {
  $headerMenuBtn.toggleClass('is-active');
  $header.toggleClass('is-menu-open');
  $menu.toggleClass('is-open');
  document.body.classList.toggle('menu-opened');
}
$('.menu__navigation a').on('click', toggleHeaderMenu);
$($headerMenuBtn).on('click', toggleHeaderMenu);
$(window).on('resize', scrollPage);
$(window).on('scroll', scrollPage);
scrollPage();

// Sliders
var mobileSliders = [];
var mobileSlidersActive = false;
function activateMobileSliders() {
  if (mobileSlidersActive) return;
  mobileSlidersActive = true;
  mobileSliders = [new Swiper('.process__slider.swiper-container', {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: '.slider__pagination',
      bulletClass: 'slider__bullet',
      bulletActiveClass: 'is-active',
      clickable: true
    }
  }), new Swiper('.webinar__slider.swiper-container', {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.slider__pagination',
      bulletClass: 'slider__bullet',
      bulletActiveClass: 'is-active',
      clickable: true
    },
    breakpoints: {
      767: {
        slidesPerView: 2,
        spaceBetween: 40
      }
    }
  }), new Swiper('.reviews__slider.swiper-container', {
    loop: false,
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.slider__pagination',
      bulletClass: 'slider__bullet',
      bulletActiveClass: 'is-active',
      clickable: true
    },
    breakpoints: {
      767: {
        slidesPerView: 2,
        spaceBetween: 40
      }
    }
  })];
}
function deactivateMobileSliders() {
  if (mobileSlidersActive && mobileSliders) {
    mobileSliders.map(function (x) {
      if (Array.isArray(x)) {
        x.map(function (x) {
          return x.destroy();
        });
      } else {
        x.destroy();
      }
    });
    mobileSliders = [];
    mobileSlidersActive = false;
  }
}
function checkMobileSliders() {
  if (window.innerWidth < 992) {
    // Activate
    activateMobileSliders();
  } else {
    // Deactivate
    deactivateMobileSliders();
  }
}
new Swiper('.cases__slider', {
  loop: false,
  effect: 'fade',
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
  }
});
var $contactTeamButtons = $('.contacts-team__slider-arrow');
var $contactTeamButtonNext = $('.contacts-team .swiper-button-next')[0];
var $contactTeamButtonPrev = $('.contacts-team .swiper-button-prev')[0];
var contactSlider = new Swiper('.contacts-team__slider.swiper-container', {
  loop: false,
  slidesPerView: 2,
  spaceBetween: 30,
  navigation: {
    nextEl: $contactTeamButtonNext,
    prevEl: $contactTeamButtonPrev,
    disabledClass: 'is-disabled'
  },
  pagination: {
    el: '.slider__pagination',
    bulletClass: 'slider__bullet',
    bulletActiveClass: 'is-active',
    clickable: true
  },
  breakpoints: {
    768: {
      centeredSlides: false,
      slidesPerView: 3,
      spaceBetween: 80
    },
    992: {
      centeredSlides: false,
      slidesPerView: 5,
      spaceBetween: 30
    },
    1300: {
      centeredSlides: false,
      slidesPerView: 6,
      spaceBetween: 70
    }
  }
});
function contactSliderHideArrows() {
  var activeNextBtn = $($contactTeamButtonNext).hasClass('is-disabled');
  var activePrevBtn = $($contactTeamButtonPrev).hasClass('is-disabled');
  if (activeNextBtn && activePrevBtn) {
    $contactTeamButtons.addClass('is-hidden');
  } else {
    $contactTeamButtons.removeClass('is-hidden');
  }
}
contactSliderHideArrows();
contactSlider.on('resize', function () {
  contactSliderHideArrows();
});
$(window).on('load resize', checkMobileSliders);

// Process

var $processVideo = $('.process__slider .video__img');
var $processTelegram = $('.process__telegram');
function webinarTelegramSize() {
  if (window.innerWidth >= 1300) {
    $processTelegram.css({
      'height': $processVideo.height()
    });
  } else {
    $processTelegram.css({
      'height': 'unset'
    });
  }
}
$(window).on('load resize', webinarTelegramSize);

// Webinar

var $webinarVideo = $('.webinar__slider .video__img');
var $webinarYoutube = $('.webinar__youtube');
function webinarYoutubeSize() {
  var height = $webinarVideo.height();
  if (height < 160) {
    $webinarYoutube.addClass('is-mini');
  } else {
    $webinarYoutube.removeClass('is-mini');
  }
  $webinarYoutube.css({
    'max-height': height
  });
}
$(window).on('load resize', webinarYoutubeSize);

// Collapses

$('.question__answer, .collapse-list__content').on('show.bs.collapse', function () {
  $(this).parent().addClass('is-active');
});
$('.question__answer, .collapse-list__content').on('hide.bs.collapse', function () {
  $(this).parent().removeClass('is-active');
});

// Modals

$('.modal').on('show.bs.modal', function () {
  $('.modal-custom-backdrop').addClass('is-open');
});
$('.modal').on('hide.bs.modal', function () {
  $('.modal-custom-backdrop').removeClass('is-open');
});
$('.modal-custom-backdrop').on('click', function () {
  $('.modal').modal('toggle');
});

// Working with form

$('form input').on('focus', function () {
  $(this).removeClass('is-error');
});
function activateError(el, name) {
  $("".concat(el, " input[name=\"").concat(name, "\"]")).addClass('is-error');
}
function checkInputRequired(el, name) {
  return $("".concat(el, " input[name=\"").concat(name, "\"]")).attr('data-required');
}
function checkFormData(el, data) {
  var error = false;
  var _iterator = _createForOfIteratorHelper(data),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _step.value,
        name = _step$value.name,
        value = _step$value.value;
      if (value === '') {
        if (checkInputRequired(el, name) !== undefined) {
          error = true;
          activateError(el, name);
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return error;
}
function normalizeFormData(data) {
  var obj = {};
  var _iterator2 = _createForOfIteratorHelper(data),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _step2$value = _step2.value,
        name = _step2$value.name,
        value = _step2$value.value;
      obj[name] = value;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return obj;
}

// Form in modal
$('#modal-order-form').submit(function (e) {
  e.preventDefault();
  var data = $(this).serializeArray();
  if (!checkFormData('#modal-order', data)) {
    var normData = normalizeFormData(data);
    $.ajax({
      url: 'callback.php',
      method: 'POST',
      dataType: 'JSON',
      data: {
        site: normData.site,
        contact: normData.contact,
        examples: normData.examples,
        count: normData.count,
        fromKnow: normData.fromKnow
      }
    }).done(function () {
      $('#modal-order .modal__tab').removeClass('is-active');
      $('#modal-order .modal__tab[data-name="success"]').addClass('is-active');
    }).fail(function () {
      var $errorText = $('#modal-order-form .form-error-text');
      $errorText[0].innerHTML = 'Has Error';
      $errorText.addClass('is-active');
      setTimeout(function () {
        $('#modal-order-form .form-error-text').removeClass('is-active');
      }, 3000);
    });
  }
});
/******/ })()
;