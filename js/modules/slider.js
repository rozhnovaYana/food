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
export default slider;