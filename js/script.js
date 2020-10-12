"use strict";
import calculator from "./modules/calculator";
import cards from "./modules/cards";
import form from "./modules/form";
import modal from "./modules/modal";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";
import {
  openModalF
} from './modules/modal';

document.addEventListener("DOMContentLoaded", () => {
  let timerForModal = setTimeout(() => openModalF(".modal", timerForModal), 5000);

  calculator();
  cards();
  form("form");
  modal("[data-modal]", ".modal", timerForModal);
  slider({
    wrapper: '.offer__slider-wrapper',
    container: ".offer__slider-scroll",
    oneSlide: ".offer__slide",
    prevArrow: ".offer__slider-prev",
    nextArrow: ".offer__slider-next",
    currentCount: "#current",
    totalCount: "#total",
    bigWrapper: ".offer__slider"
  });
  tabs(".tabheader__item", ".tabheader__items", ".tabcontent", "tabheader__item_active");
  timer("2020-12-20", ".timer");

});