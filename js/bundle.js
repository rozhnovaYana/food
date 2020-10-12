/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function calculator() {
    const result = document.querySelector(".calculating__result span");
    let sex,
        height,
        weight,
        index,
        age;
    if (localStorage.getItem("sex")) {
        sex = localStorage.getItem("sex");
    } else {
        sex = "male";
    }
    if (localStorage.getItem("index")) {
        index = localStorage.getItem("index");
    } else {
        index = 1.375;
    }

    function localStorageSettings(parents, activeClass) {
        const blocks = document.querySelectorAll(`${parents} div`);
        blocks.forEach(item => {
            item.classList.remove(activeClass);
            if (item.getAttribute("id") == localStorage.getItem("sex")) {
                item.classList.add(activeClass);
            }
            if (item.getAttribute("data-index") == localStorage.getItem("index")) {
                item.classList.add(activeClass);
            }
        });
    }
    localStorageSettings(".calculating__choose_big", "calculating__choose-item_active");
    localStorageSettings("#gender", "calculating__choose-item_active");

    function calcResult() {
        if (!sex || !height || !weight || !index || !age) {
            result.textContent = "___";
            return;
        }

        if (sex == "male") {
            result.textContent = Math.round(index * (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age));
        } else {
            result.textContent =
                Math.round(index * (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age));
        }
    }
    calcResult();

    function staticData(parents, activeClass) {
        const blocks = document.querySelectorAll(`${parents} div`);
        blocks.forEach((block) => {
            block.addEventListener("click", (e) => {
                if (e.target.getAttribute("data-index")) {
                    index = +block.getAttribute("data-index");
                    localStorage.setItem('index', +block.getAttribute("data-index"));
                } else {
                    sex = e.target.getAttribute("id");
                    localStorage.setItem('sex', e.target.getAttribute("id"));
                }
                blocks.forEach(block => {
                    block.classList.remove(activeClass);

                });
                block.classList.add(activeClass);
                console.log(index, sex);
                calcResult();
            });


        });

    }

    function dynamicData(selector) {
        const input = document.querySelector(selector);
        input.addEventListener("input", () => {
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }
            switch (input.getAttribute('id')) {
                case ('height'):
                    height = +input.value;
                    break;
                case ('weight'):
                    weight = +input.value;
                    break;
                case ('age'):
                    age = +input.value;
                    break;
            }
            calcResult();
        });
    }
    staticData(".calculating__choose_big", "calculating__choose-item_active");
    staticData("#gender", "calculating__choose-item_active");
    dynamicData("#age");
    dynamicData("#height");
    dynamicData("#weight");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    class MenuItem {
        constructor(src, alt, item, description, price, parent, ...rest) {
            this.src = src;
            this.alt = alt;
            this.item = item;
            this.description = description;
            this.price = price;
            this.transfer = 27;
            this.parent = parent;
            this.rest = rest;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        createCard() {
            const div = document.createElement("div");
            if (this.rest.length == 0) {
                this.rest.push("menu__item");
            }
            this.rest.forEach((className) => div.classList.add(className));
            div.innerHTML = `<img src=${this.src} alt=${this.alt}>
             <h3 class = "menu__item-subtitle" > ${this.item} </h3>
             <div class = "menu__item-descr" >${this.description}</div> <div class = "menu__item-divider" > </div> 
             <div class = "menu__item-price"/> <div class = "menu__item-cost" > Цена: </div>
              <div class = "menu__item-total" > <span> ${this.price} </span>
              грн/день </div> </div> `;
            document.querySelector(this.parent).prepend(div);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.createMenuCard)("http://localhost:3000/menu").then((data) => {
        data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
        }) => {
            new MenuItem(
                img,
                altimg,
                title,
                descr,
                price,
                ".menu__field .container"
            ).createCard();
        });
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector) {
    const form = document.querySelectorAll(formSelector);
    const status = {
        load: "img/spinner/spinner.svg",
        succes: "Мы вам перезвоним",
        fail: "Попробуйте позже",
    };
    form.forEach((item) => {
        blindPostDate(item);
    });

    function blindPostDate(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const statusDiv = document.createElement("img");
            statusDiv.src = status.load;
            statusDiv.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement("afterend", statusDiv);
            const dataForm = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(dataForm.entries()));
            (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)("http://localhost:3000/requests", json)
                .then((text) => {
                    console.log(text);
                    showThanksModal(status.succes);
                    statusDiv.remove();
                })
                .catch(() => {
                    showThanksModal(status.fail);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const modal = document.querySelector(".modal__dialog");
        modal.classList.add("hide");
        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog", "center");
        document.querySelector(".modal").prepend(thanksModal);
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        setTimeout(() => {
            thanksModal.remove();
            modal.classList.remove("hide");
            (0,_modal__WEBPACK_IMPORTED_MODULE_1__.closeModalF)(".modal");
        }, 4000);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! namespace exports */
/*! export closeModalF [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export openModalF [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "closeModalF": () => /* binding */ closeModalF,
/* harmony export */   "openModalF": () => /* binding */ openModalF
/* harmony export */ });
function closeModalF(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";

}

function openModalF(modalSelector, timerForModal) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(timerForModal);
}

function modal(openModalSelector, modalSelector, timerForModal) {
    const openModal = document.querySelectorAll(openModalSelector),
        modal = document.querySelector(modalSelector);


    function closeModalF() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
    openModal.forEach((item) => {
        item.addEventListener("click", () => {
            openModalF(modalSelector, timerForModal);
        });
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            closeModalF(modalSelector);
        }
    });
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
            closeModalF(modalSelector);
        }
    });


    function scrollModal() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModalF(modalSelector, timerForModal);
            removeEventListener("scroll", scrollModal);
        }
    }
    window.addEventListener("scroll", scrollModal);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function slider({
    wrapper,
    container,
    oneSlide,
    prevArrow,
    nextArrow,
    currentCount,
    totalCount,
    bigWrapper
}) {
    const sliderWrapper = document.querySelector(wrapper),
        sliderScroll = document.querySelector(container),
        slides = document.querySelectorAll(oneSlide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        current = document.querySelector(currentCount),
        total = document.querySelector(totalCount);
    let width = window.getComputedStyle(sliderWrapper).width;
    width = Math.floor(width.slice(0, width.length - 2));
    let scroll = 0;
    let slide = 1;
    sliderScroll.style.width = 100 * slides.length + `%`;
    slides.forEach((slide) => {
        slide.style.width = width;
    });
    sliderScroll.style.display = `flex`;
    sliderScroll.style.transition = `0.5s all`;
    sliderWrapper.style.overflow = "hidden";
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = "0" + slide;
    } else {
        total.textContent = slides.length;
        current.textContent = slide;
    }
    let maxScroll = (slides.length - 1) * width;
    const slider = document.querySelector(bigWrapper),
        dotWrapper = document.createElement("ul"),
        dots = [];
    dotWrapper.classList.add("carousel-indicators");
    slider.style.position = "relative";
    slider.append(dotWrapper);
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dotWrapper.append(dot);
        dot.classList.add("dot");
        dots.push(dot);
        if (i == 0) {
            dot.style.opacity = "1";
        }
        dot.setAttribute("data-slide-to", i + 1);
    }

    next.addEventListener("click", () => {
        if (slide == slides.length) {
            slide = 1;
        } else {
            slide += 1;
        }
        if (scroll == maxScroll) {
            scroll = 0;
        } else {
            scroll += width;
        }
        sliderScroll.style.transform = `translateX(-${scroll}px)`;
        if (slides.length < 10) {
            current.textContent = "0" + slide;
        } else {
            current.textContent = slide;
        }
        dots.forEach((dot) => {
            dot.style.opacity = "0.5";
        });
        dots[slide - 1].style.opacity = "1";
    });

    prev.addEventListener("click", () => {
        if (slide == 1) {
            slide = slides.length;
        } else {
            slide -= 1;
        }
        if (scroll == 0) {
            scroll = maxScroll;
        } else {
            scroll -= width;
        }
        sliderScroll.style.transform = `translateX(-${scroll}px)`;

        if (slides.length < 10) {
            current.textContent = "0" + slide;
        } else {
            current.textContent = slide;
        }
        dots.forEach((dot) => {
            dot.style.opacity = "0.5";
        });
        dots[slide - 1].style.opacity = "1";
    });
    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            const activeDot = e.target.getAttribute("data-slide-to");
            slide = +activeDot;
            scroll = (activeDot - 1) * width;
            sliderScroll.style.transform = `translateX(-${scroll}px)`;
            dots.forEach((dot) => {
                dot.style.opacity = "0.5";
            });
            dot.style.opacity = "1";
            if (slides.length < 10) {
                current.textContent = "0" + slide;
            } else {
                current.textContent = slide;
            }
        });
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabs(tabsSelector, tabsHeaderSelector, tabsContentSelector, activeClass) {
    const tabheaderItem = document.querySelectorAll(tabsSelector),
        tabheaderItems = document.querySelector(tabsHeaderSelector),
        tabcontent = document.querySelectorAll(tabsContentSelector);

    function hideTabContent() {
        tabcontent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });
        tabheaderItem.forEach((item) => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabcontent[i].classList.add("show", "fade");
        tabcontent[i].classList.remove("hide");
        tabheaderItem[i].classList.add(activeClass);
    }
    hideTabContent();
    showTabContent();

    tabheaderItems.addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains(tabsSelector.slice(1))) {
            tabheaderItem.forEach((item, i) => {
                if (item == event.target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function timer(deadline, timer) {


    function getTimerDifference(endTime) {
        let t = new Date(endTime) - new Date(),
            days = Math.floor(t / (24 * 60 * 60 * 1000)),
            hours = Math.floor((t / (60 * 60 * 1000)) % 24),
            minutes = Math.floor((t / (60 * 1000)) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            t: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    function setNull(num) {
        if (num >= 0 && num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }

    function getTimeId(selector, endTime) {
        let timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds");

        let timerId = setInterval(setTimer, 1000);
        setTimer();

        function setTimer() {
            let t = getTimerDifference(endTime);
            if (t.t <= 0) {
                days.innerHTML = setNull(0);
                hours.innerHTML = setNull(0);
                minutes.innerHTML = setNull(0);
                seconds.innerHTML = setNull(0);
            } else {
                days.innerHTML = setNull(t.days);
                hours.innerHTML = setNull(t.hours);
                minutes.innerHTML = setNull(t.minutes);
                seconds.innerHTML = setNull(t.seconds);
                if (t.t <= 0) {
                    clearInterval(timerId);
                }
            }
        }
    }
    getTimeId(timer, deadline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");










document.addEventListener("DOMContentLoaded", () => {
  let timerForModal = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModalF)(".modal", timerForModal), 5000);

  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_3__.default)();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_0__.default)();
  (0,_modules_form__WEBPACK_IMPORTED_MODULE_1__.default)("form");
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default)("[data-modal]", ".modal", timerForModal);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__.default)({
    wrapper: '.offer__slider-wrapper',
    container: ".offer__slider-scroll",
    oneSlide: ".offer__slide",
    prevArrow: ".offer__slider-prev",
    nextArrow: ".offer__slider-next",
    currentCount: "#current",
    totalCount: "#total",
    bigWrapper: ".offer__slider"
  });
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__.default)(".tabheader__item", ".tabheader__items", ".tabcontent", "tabheader__item_active");
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__.default)("2020-12-20", ".timer");

});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! namespace exports */
/*! export createMenuCard [provided] [no usage info] [missing usage info prevents renaming] */
/*! export postData [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "createMenuCard": () => /* binding */ createMenuCard
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: data,
    });
    return await res.json();
};
const createMenuCard = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Error ${res.status}`);
    }
    return await res.json();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map