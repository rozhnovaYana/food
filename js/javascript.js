"use strict";
document.addEventListener("DOMContentLoaded", () => {
  //tabs
  const tabheaderItem = document.querySelectorAll(".tabheader__item"),
    tabheaderItems = document.querySelector(".tabheader__items"),
    tabcontent = document.querySelectorAll(".tabcontent");

  function hideTabContent() {
    tabcontent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabheaderItem.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabcontent[i].classList.add("show", "fade");
    tabcontent[i].classList.remove("hide");
    tabheaderItem[i].classList.add("tabheader__item_active");
  }
  hideTabContent();
  showTabContent();

  tabheaderItems.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("tabheader__item")) {
      tabheaderItem.forEach((item, i) => {
        if (item == event.target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
  //timer
  const deadline = "2020-8-16";

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
  getTimeId(".timer", deadline);
  const openModal = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  function openModalF() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(timerForModal);
  }

  function closeModalF() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }
  openModal.forEach((item) => {
    item.addEventListener("click", () => {
      openModalF();
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModalF();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModalF();
    }
  });
  let timerForModal = setTimeout(openModalF, 5000);

  function scrollModal() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModalF();
      removeEventListener("scroll", scrollModal);
    }
  }
  window.addEventListener("scroll", scrollModal);

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
  const createMenuCard = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }
    return await res.json();
  };
  createMenuCard("http://localhost:3000/menu").then((data) => {
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

  const form = document.querySelectorAll("form");
  const status = {
    load: "img/spinner/spinner.svg",
    succes: "Мы вам перезвоним",
    fail: "Попробуйте позже",
  };
  form.forEach((item) => {
    blindPostDate(item);
  });
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
      postData("http://localhost:3000/requests", json)
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
      closeModalF();
    }, 4000);
  }
  const sliderWrapper = document.querySelector(".offer__slider-wrapper"),
    sliderScroll = document.querySelector(".offer__slider-scroll"),
    slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total");
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
  const slider = document.querySelector(".offer__slider"),
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

  //calcutator

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
});