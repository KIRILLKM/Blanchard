// header
document.querySelectorAll('.dropdown-menu__scrolbar').forEach(dropdow => {
  new SimpleBar(dropdow, {
    autoHide: false,
    scrollbarMaxSize: 28,
  });
  document.querySelectorAll('.simplebar-content-wrapper').forEach(removeTabIndex => {
    removeTabIndex.removeAttribute('tabindex');
    removeTabIndex.removeAttribute('aria-label');
  });
});

let dropdownBtn = document.querySelectorAll('.dropdown-list__btn');
let dropdownMenu = document.querySelectorAll('.dropdown-menu');

dropdownBtn.forEach((item) => {
  item.addEventListener('click', function (event) {
    const nextElement = item.nextElementSibling;
    nextElement.addEventListener('click', (event) => {
      event._isClick = true;
    });
    event._isClick = true;
    dropdownMenu.forEach(function (e) {
      if ((e) != nextElement) {
        e.classList.remove('dropdown-menu--active')
      };
    });
    dropdownBtn.forEach(function (e) {
      if ((e) != item) {
        e.classList.remove('dropdown-list__btn--active')
        e.setAttribute('aria-expanded', false)
      };
    });
    nextElement.classList.toggle('dropdown-menu--active');
    item.classList.toggle('dropdown-list__btn--active');
    if (item.classList.contains('dropdown-list__btn--active')) {
      item.setAttribute('aria-expanded', true);
    } else {
      item.setAttribute('aria-expanded', false);
    };
    document.body.addEventListener('click', (event) => {
      if (event._isClick == true) return
      item.classList.remove('dropdown-list__btn--active');
      nextElement.classList.remove('dropdown-menu--active');
    });
  });
});

var burgerBtn = document.querySelector('.burger');
var burgerMenu = document.querySelector('.header__wrapper');
var burgerMenuLink = document.querySelectorAll('.nav__link');

burgerBtn.addEventListener('click', () => {
  burgerMenu.classList.toggle('active');
  burgerBtn.classList.toggle('burger--active');
  document.body.classList.toggle('stop-scroll');
  document.querySelector('html').classList.toggle('stop-scroll');
  burgerMenuLink.forEach(el => {
    el.addEventListener('click', () => {
      burgerMenu.classList.remove('active');
      burgerBtn.classList.remove('burger--active');
      document.querySelector('.header__logo').removeAttribute('tabindex');
      burgerBtn.setAttribute('aria-expanded', false);
      document.body.classList.remove('stop-scroll');
      document.querySelector('html').classList.remove('stop-scroll');
    });
  });
  if (burgerBtn.classList.contains('burger--active')) {
    burgerBtn.setAttribute('aria-expanded', true);
    document.querySelector('.header__logo').setAttribute('tabindex', 1);
  } else {
    burgerBtn.setAttribute('aria-expanded', false);
    document.querySelector('.header__logo').removeAttribute('tabindex');
  }
});

var searchBtn = document.querySelector('.header__btn-search');
var searchForm = document.querySelector('.header__search-form');
var searchFormBtnClose = document.querySelector('.search-form__btn--close');

searchBtn.addEventListener('click', () => {
  searchForm.classList.toggle('active');
  searchBtn.classList.toggle('active');
  searchFormBtnClose.addEventListener('click', () => {
    searchForm.classList.remove('active');
    searchBtn.classList.remove('active');
  });
});

// hero
const swiper = new Swiper('.hero__swiper', {
  autoplay: {
    delay: 5000,
  },
  loop: true,
});

// gallery
const element = document.querySelector('.gallery__select');
const choices = new Choices(element, {
  searchEnabled: false,
  shouldSortItems: true,
  itemSelectText: '',
});
document.querySelector('.choices').setAttribute('aria-label', 'выпадающий список фильтров');

const gallerySwiper = new Swiper('.gallery__swiper', {
  slidesPerView: 3,
  spaceBetween: 50,
  slidesPerGroup: 3,
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 34,
      slidesPerGroup: 2,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 50,
      slidesPerGroup: 3,
    },
  },
  navigation: {
    nextEl: '.gallery__swiper-button--next',
    prevEl: '.gallery__swiper-button--prev',
  },
  pagination: {
    el: '.gallery__swiper-pagination',
    type: 'fraction',
  },
  a11y: {
    prevSlideMessage: 'преведущий слайд',
    nextSlideMessage: 'следующий слайд',
    itemRoleDescriptionMessage: 'слайд',
  },
});

var modalTriger = document.querySelectorAll('.gallery__swiper-slide');
var modal = document.querySelectorAll('.modal');
var modalCloseBtn = document.querySelectorAll('.modal__btn');
var modalBox = document.querySelectorAll('.modal__box');

modalTriger.forEach(el => {
  el.addEventListener('click', function (e) {
    const data = e.currentTarget.dataset.path;
    const thisElement = document.querySelector(`[data-target="${data}"]`);
    modalBox.forEach(el => {
      el.addEventListener('click', e => {
        e._isClick = true;
      });
    });
    e._isClick = true;
    thisElement.classList.add('active');
    modalCloseBtn.forEach(el => {
      el.addEventListener('click', () => {
        thisElement.classList.remove('active');
        document.body.classList.remove('stop-scroll');
      });
    });
    document.body.classList.add('stop-scroll')
    document.body.addEventListener('click', e => {
      if (e._isClick == true) return
      thisElement.classList.remove('active');
      document.body.classList.remove('stop-scroll');
    });
  });
});

document.querySelectorAll(".modal__simplebar").forEach(el => {
  new SimpleBar(el, {
    autoHide: false,
    scrollbarMaxSize: 25,
  });
});

// catalog

var acccardionBtn = document.querySelectorAll('.accardion__btn');
var accardionContent = document.querySelectorAll('.accardion__content');
var accardionTabindex = document.querySelectorAll('.accardion--tabindex');

acccardionBtn.forEach((item) => {
  item.addEventListener('click', function () {
    const nextElement = item.nextElementSibling;
    const tabIndexElement = item.closest('.accardion__header').querySelectorAll('.accardion--tabindex');
    if (nextElement.style.maxHeight) {
      accardionContent.forEach(e => {
        e.style.maxHeight = null;
      });
      acccardionBtn.forEach(e => {
        e.classList.remove('accardion__btn--active');
        e.setAttribute('aria-expanded', false);
      });
      accardionTabindex.forEach(e => {
        e.setAttribute('tabindex', "1");
      });
    } else {
      accardionContent.forEach(e => {
        e.style.maxHeight = null;
      });
      acccardionBtn.forEach(e => {
        e.classList.remove('accardion__btn--active');
        e.setAttribute('aria-expanded', false);
      });
      accardionTabindex.forEach(e => {
        e.setAttribute('tabindex', "1");
      });
      nextElement.style.maxHeight = nextElement.scrollHeight + 'px';
      item.classList.add('accardion__btn--active');
      item.setAttribute('aria-expanded', true);
      tabIndexElement.forEach(e => {
        e.setAttribute('tabindex', "0");
      });
    }
  });
});

var tabsBtn = document.querySelectorAll('.accardion__button');
var tabsContent = document.querySelectorAll('.catalog__block--left');

tabsBtn.forEach(el => {
  el.addEventListener('click', e => {
    const target = e.currentTarget.dataset.path;
    tabsContent.forEach(e => {
      e.classList.remove('active');
    });
    document.querySelector(`[data-target="${target}"]`).classList.add('active');
  });
});

// events
const eventsSwiper = new Swiper('.events__swiper', {
  slidesPerView: 3,
  spaceBetween: 50,
  slidesPerGroup: 3,
  navigation: {
    nextEl: '.events-swiper__button--next',
    prevEl: '.events-swiper__button--prev',
  },
  pagination: {
    el: '.events__swiper-pagination',
    type: 'bullets',
    clickable: 'true',
  },
  a11y: {
    prevSlideMessage: 'преведущий слайд',
    nextSlideMessage: 'следующий слайд',
    itemRoleDescriptionMessage: 'слайд',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 34,
      slidesPerGroup: 2,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 27,
      slidesPerGroup: 3,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 50,
      slidesPerGroup: 3,
    },
  }
});

// projects
tippy('.projects__tooltip', {
  content: 'Lorem ipsum dolor sit amet.',
  theme: 'purpule',
});

const projectSwiper = new Swiper('.project-swiper', {
  slidesPerView: 3,
  spaceBetween: 50,
  slidesPerGroup: 3,
  loop: true,
  navigation: {
    nextEl: '.project__swiper-button--next',
    prevEl: '.project__swiper-button--prev ',
  },
  a11y: {
    prevSlideMessage: 'преведущий слайд',
    nextSlideMessage: 'следующий слайд',
    itemRoleDescriptionMessage: 'слайд',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 34,
      slidesPerGroup: 2,
    },
    1024: {
      spaceBetween: 50,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 50,
      slidesPerGroup: 3,
    },
  }
});

// contacts
var selector = document.querySelector('input[type="tel"]');
var im = new Inputmask('+7 (999) 999-99-99');
im.mask(selector);

new window.JustValidate('.contacts-form', {
  rules: {
    tel: {
      required: true,
      function: () => {
        const phone = selector.inputmask.unmaskedvalue()
        return Number(phone) && phone.length === 10;
      }
    }
  },
  messages: {
    name: {
      required: 'Введите ваше имя',
      minLength: 'Введите более 3 символов',
      maxLength: 'Введите менее 30 символов'
    },
    tel: {
      required: 'Введите ваш номер',
      function: 'Некорректный номер телефона'
    },
  },
  colorWrong: '#D11616',
  submitHandler: function (thisForm) {
    let formData = new FormData(thisForm);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert('Отправлено');
        }
      }
    }
    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);
    thisForm.reset();
  }
});

ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.758468, 37.601088],
    zoom: 16,
    controls: ['smallMapDefaultSet', 'geolocationControl', 'zoomControl'],
  }, {
    zoomControlPosition: {
      bottom: '380px',
      right: '20px'
    },
    geolocationControlPosition: {
      bottom: '340px',
      right: '20px'
    },
  });
  myMap.controls.remove('rulerControl');
  myMap.controls.remove('searchControl');
  myMap.controls.remove('trafficControl');
  myMap.controls.remove('typeSelector');
  myMap.controls.remove('fullscreenControl');
  myMap.controls.remove('gotoymapsControl');
  var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
    iconLayout: 'default#image',
    iconImageHref: './img/map__tag.svg',
    iconImageSize: [20, 20],
  });
  myMap.geoObjects.add(myPlacemark);
}

