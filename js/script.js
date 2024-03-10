"use strict";

const initLozad = () => {
    const lozadElements = document.querySelectorAll('[data-lozad]');

    if (!lozadElements || !lozad) return;

    lozadElements.forEach(element => {
        const lozadObserver = lozad(element);

        lozadObserver.observe();
    })
}

const initBurgerMenu = () => {
    const burger = document.querySelector('.burger');
    let burgerMenu;

    if (window.matchMedia('(max-width: 768px)').matches) {
        burgerMenu = document.querySelector('.site-header__panel');
    } else {
        burgerMenu = document.querySelector('.menu');
    }

    if (!burger || !burgerMenu) return;

    const menuElements = Array.from(burgerMenu.querySelectorAll('*'));
    const menuLinks = burgerMenu.querySelectorAll('.menu__link');

    burger.addEventListener('click', handleBurgerClick);
    window.addEventListener('click', handleClickBurgerOutside);
    menuLinks.forEach(link => link.addEventListener('click', closeMenu));

    function handleBurgerClick() {
        burger.classList.toggle('is-active');
        burgerMenu.classList.toggle('is-open');

        if (window.matchMedia('(max-width: 768px)').matches) {
            document.body.classList.toggle('is-lock');
        }
    }

    function closeMenu() {
        burger.classList.remove('is-active');
        burgerMenu.classList.remove('is-open');

        if (window.matchMedia('(max-width: 768px)').matches) {
            document.body.classList.remove('is-lock');
        }
    }

    function handleClickBurgerOutside(e) {
        const { target } = e;

        if (!target.classList.contains('burger') && !target.classList.contains('menu') && !target.classList.contains('site-header__panel') && !menuElements.includes(target)) {
            closeMenu();
        }
    }
}

const animateHeader = () => {
    const header = document.querySelector('.site-header');

    if (!header) return;

    let lastScrollTop;

    window.addEventListener('scroll', observeHeader);

    function observeHeader() {
        const scrollTop = document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 50) {
            header.classList.add('is-scrolling-down');
        } else {
            header.classList.remove('is-scrolling-down');
        }

        lastScrollTop = scrollTop;
    }
}

const initSliders = () => {
    const slidersWrappers = document.querySelectorAll('[data-slider]');

    if (!slidersWrappers) return;

    slidersWrappers.forEach(sliderWrapper => {
        const slider = sliderWrapper.querySelector('.swiper');

        initSlider(sliderWrapper, slider);
    });

    function initSlider(sliderWrapper, slider) {
        const sliderPrev = sliderWrapper.querySelector('[data-slider-arrow-prev]');
        const sliderNext = sliderWrapper.querySelector('[data-slider-arrow-next]');
        const sliderType = sliderWrapper.dataset.slider;

        let options = {
            loop: true,
            speed: 1000,
            spaceBetween: 32,
            grabCursor: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            navigation: {
                prevEl: sliderPrev,
                nextEl: sliderNext,
            }
        }

        if (sliderType === 'team') {
            options = {
                ...options,
                pagination: {
                    el: '.team__slider-pagination',
                    clickable: true,
                    dynamicBullets: true
                }
            }
        }

        if (sliderType === 'sublimators') {
            options = {
                ...options,
                autoHeight: true,
                pagination: {
                    el: '.sublimator-card__pagination',
                    clickable: true,
                }
            }
        }

        if (sliderType === 'success-stories') {
            options = {
                ...options,
                autoHeight: true
            }
        }

        const sliderSwiper = new Swiper(slider, options);

        if (sliderType === 'sublimators') {
            const allArrowsPrev = sliderWrapper.querySelectorAll('[data-slider-arrow-prev]');
            const allArrowsNext = sliderWrapper.querySelectorAll('[data-slider-arrow-next]');

            allArrowsPrev.forEach(arrow => arrow.addEventListener('click', () => sliderSwiper.slidePrev()))
            allArrowsNext.forEach(arrow => arrow.addEventListener('click', () => sliderSwiper.slideNext()))
        }
    }
}

const initAnchors = () => {
    const anchors = document.querySelectorAll('[data-anchor]');

    if (!anchors) return;

    anchors.forEach(link => {

        link.addEventListener('click', function (e) {
            e.preventDefault();

            const href = this.getAttribute('href');
            const isToOtherPage = href.includes('/');

            if (isToOtherPage) window.location.href = href;

            const scrollTarget = document.querySelector(href);

            if (!scrollTarget) return;

            const topOffset = document.querySelector('.site-header').offsetHeight;
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

}

const initScrollOnload = () => {
    let hash = location.hash;

    if (!hash[0]) return;

    location.hash = '';

    const scrollTarget = document.querySelector(hash);

    if (!scrollTarget) return;

    const topOffset = document.querySelector('.site-header').offsetHeight;
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
    });


}

window.addEventListener("DOMContentLoaded", (e) => {
    initLozad();
    initBurgerMenu();
    animateHeader();
    initSliders();
    initAnchors();
    initScrollOnload();
});
