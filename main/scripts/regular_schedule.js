const regularSchedule = document.getElementById('regular-clock-schedule');
const nextClassIn = document.getElementById('regular-time-remaining');

const firstBlock = new Date().setHours(8, 55, 0, 0);
const secondBlock = new Date().setHours(10, 20, 0, 0);
const breakTime = new Date().setHours(10, 55, 0, 0);
const thirdBlock = new Date().setHours(12, 55, 0, 0);
const endOfDay = new Date().setHours(14, 20, 0, 0);

const schedule = [
    { id: '1', name: "1st period (A1/B5)", time: firstBlock },
    { id: '2', name: "2nd period (A2/B6)", time: secondBlock },
    { id: '3', name: "Charger Time", time: breakTime },
    { id: '4', name: "3rd period (A3/B7)", time: thirdBlock },
    { id: '5', name: "4th period (A4/B8)", time: endOfDay },
];


const timerElements = {
    '1': document.getElementById('1'),
    '2': document.getElementById('2'),
    '3': document.getElementById('3'),
    '4': document.getElementById('4'),
    '5': document.getElementById('5'),
};

function updateTimer() {
    const currentTime = new Date().getTime();

    let nextClass = schedule.find(classTime => currentTime < classTime.time);
    let previousClass = schedule.slice().reverse().find(classTime => currentTime >= classTime.time);

    if (!nextClass) {
        regularSchedule.innerHTML = "School is over for today!";
        nextClassIn.innerHTML = "";
        clearInterval(timer);
        return;
    }

    let timeRemaining = nextClass.time - currentTime;

    let hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    regularSchedule.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
    nextClassIn.innerHTML = "Going into " + nextClass.name + " in...";


    for (const key in timerElements) {
        if (timerElements.hasOwnProperty(key)) {
            timerElements[key].classList.remove('highlight_current_class');
        }
    }

    if (previousClass) {
        timerElements[previousClass.id].classList.add('highlight_current_class');
    }
}

const timer = setInterval(updateTimer, 1000);