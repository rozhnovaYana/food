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
export default tabs;