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
export default timer;