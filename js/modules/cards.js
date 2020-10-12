import {
    createMenuCard
}
from '../services/services';

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
}
export default cards;