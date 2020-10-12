import {
    closeModalF,
    openModalF
} from './modal';
import {
    postData
} from '../services/services';

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
            closeModalF(".modal");
        }, 4000);
    }
}
export default form;