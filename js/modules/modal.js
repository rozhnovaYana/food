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
export default modal;
export {
    closeModalF,
    openModalF
};