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
export default calculator;