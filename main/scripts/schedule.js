const schedules = {
    regular: {
        title: "Regular",
        classes: [
            { name: "A1/B5", endTime: new Date().setHours(8, 55, 0, 0), interval: "7:35 - 8:55" },
            { name: "A2/B6", endTime: new Date().setHours(10, 20, 0, 0), interval: "9:00 - 10:20" },
            { name: "Charger Time", endTime: new Date().setHours(10, 55, 0, 0), interval: "10:20 - 10:55" },
            { name: "A3/B7", endTime: new Date().setHours(12, 55, 0, 0), interval: "11:00 - 12:55" },
            { name: "A4/B8", endTime: new Date().setHours(14, 20, 0, 0), interval: "13:00 - 14:20" },
        ],
        lunches: [
            { name: "1st", endTime: new Date().setHours(11, 25, 0, 0), interval: "11:00 - 11:25" },
            { name: "2nd", endTime: new Date().setHours(11, 55, 0, 0), interval: "11:30 - 11:55" },
            { name: "3rd", endTime: new Date().setHours(12, 25, 0, 0), interval: "12:00 - 12:25" },
            { name: "4th", endTime: new Date().setHours(12, 55, 0, 0), interval: "12:30 - 12:55" },
        ]
    },
    earlyDismissal: {
        title: "Early Dismisal",
        classes: [
            { name: "A1/B5", endTime: new Date().setHours(8, 25, 0, 0), interval: "7:35 - 8:25" },
            { name: "A2/B6", endTime: new Date().setHours(9, 20, 0, 0), interval: "8:30 - 9:20" },
            { name: "A3/B7", endTime: new Date().setHours(10, 15, 0, 0), interval: "9:25 - 10:15" },
            { name: "A4/B8", endTime: new Date().setHours(11, 15, 0, 0), interval: "10:20 - 11:15" },
        ],
        lunches: []
    },
    twoHourDelay: {
        title: "2 Hour Delay",
        classes: [
            { name: "A1/B5", endTime: new Date().setHours(10, 30, 0, 0), interval: "9:35 - 10:30" },
            { name: "A2/B6", endTime: new Date().setHours(11, 30, 0, 0), interval: "10:35 - 11:30" },
            { name: "A3/B7", endTime: new Date().setHours(13, 25, 0, 0), interval: "11:35 - 13:25" },
            { name: "A4/B8", endTime: new Date().setHours(14, 20, 0, 0), interval: "13:30 - 14:20" },
        ],
        lunches: [
            { name: "1st", endTime: new Date().setHours(11, 55, 0, 0), interval: "11:30 - 11:55" },
            { name: "2nd", endTime: new Date().setHours(12, 25, 0, 0), interval: "12:00 - 12:25" },
            { name: "3rd", endTime: new Date().setHours(12, 55, 0, 0), interval: "12:30 - 12:55" },
            { name: "4th", endTime: new Date().setHours(13, 25, 0, 0), interval: "13:00 - 13:25" },
        ]
    },
    prepRalley: {
        title: "Prep Ralley",
        classes: [
            { name: "A1/B5", endTime: new Date().setHours(8, 40, 0, 0), interval: "7:35 - 8:40" },
            { name: "A2/B6", endTime: new Date().setHours(9, 50, 0, 0), interval: "8:45 - 9:50" },
            { name: "A3/B7", endTime: new Date().setHours(11, 1, 0, 0), interval: "9:55 - 11:01" },
            { name: "A4/B8", endTime: new Date().setHours(13, 8, 0, 0), interval: "11:06 - 13:08" },
            { name: "Pep Rally", endTime: new Date().setHours(14, 20, 0, 0), interval: "13:10 - 14:20" },
        ],
        lunches: [
            { name: "1st", endTime: new Date().setHours(11, 34, 0, 0), interval: "11:06 - 11:34" },
            { name: "2nd", endTime: new Date().setHours(12, 8, 0, 0), interval: "11:38 - 12:08" },
            { name: "3rd", endTime: new Date().setHours(12, 38, 0, 0), interval: "12:10 - 12:38" },
            { name: "4th", endTime: new Date().setHours(13, 8, 0, 0), interval: "12:42 - 13:08" },
        ]
    },
};

let currentschedule = schedules.regular;

const scheduleSwitch = document.querySelector('.schedule-switch');

const title = document.querySelector('.schedule-titles');
const lunch_title = document.querySelector('.lunch-title');

const first_class = document.getElementById('1st-class');
const second_class = document.getElementById('2nd-class');
const third_class = document.getElementById('3rd-class');
const fourth_class = document.getElementById('4th-class');
const fifth_class = document.getElementById('5th-class');

const first_lunch = document.getElementById('1st-lunch');
const second_lunch = document.getElementById('2nd-lunch');
const third_lunch = document.getElementById('3rd-lunch');
const fourth_lunch = document.getElementById('4th-lunch');



function updateScheduleDisplay() {
    title.innerHTML = currentschedule.title + ' Schedule';
    lunch_title.innerHTML = currentschedule.title + ' Lunch Schedule';

    first_class.innerHTML = currentschedule.classes[0].name + ": " + '<b>' + currentschedule.classes[0].interval + '</b>';
    second_class.innerHTML = currentschedule.classes[1].name + ": " + '<b>' + currentschedule.classes[1].interval + '</b>';
    third_class.innerHTML = currentschedule.classes[2].name + ": " + '<b>' + currentschedule.classes[2].interval + '</b>';
    fourth_class.innerHTML = currentschedule.classes[3].name + ": " + '<b>' + currentschedule.classes[3].interval + '</b>';
    if (currentschedule.classes.length > 4) {
        fifth_class.innerHTML = currentschedule.classes[4].name + ": " + '<b>' + currentschedule.classes[4].interval + '</b>';
    } else {
        fifth_class.innerHTML = '';
    }

    if (currentschedule.lunches.length === 0) {
        first_lunch.innerHTML = '1st: <b> N/A </b>';
        second_lunch.innerHTML = '2nd: <b> N/A </b>';
        third_lunch.innerHTML = '3rd: <b> N/A </b>';
        fourth_lunch.innerHTML = '4th: <b> N/A </b>';
        document.getElementById('lunch-clock').innerText = "No lunch for today hehe";
        document.getElementById('current-lunch').innerText = '';
    } else {
        first_lunch.innerHTML = currentschedule.lunches[0].name + ": " + '<b>' + currentschedule.lunches[0].interval + '</b>';
        second_lunch.innerHTML = currentschedule.lunches[1].name + ": " + '<b>' + currentschedule.lunches[1].interval + '</b>';
        third_lunch.innerHTML = currentschedule.lunches[2].name + ": " + '<b>' + currentschedule.lunches[2].interval + '</b>';
        fourth_lunch.innerHTML = currentschedule.lunches[3].name + ": " + '<b>' + currentschedule.lunches[3].interval + '</b>';
    }
}

scheduleSwitch.addEventListener('change', () => {
    const selectedValue = scheduleSwitch.value;
    currentschedule = schedules[selectedValue];
    updateScheduleDisplay();
    UpdateCountdowns();
});


function UpdateCountdowns() {
    // Class Schedule
    const currentTime = new Date().getTime();

    let nextClassEndTime = null;
    let classCurrently = null;
    for (const classPeriod of currentschedule.classes) {
        const endTime = classPeriod.endTime;
        if (endTime > currentTime) {
            nextClassEndTime = endTime;
            classCurrently = classPeriod.name;
            break;
        }
    }

    if (!nextClassEndTime) {
        document.getElementById('schedule-clock').innerText = "No more classes today.";
        document.getElementById('current-class').innerText = '';
        return;
    }
    let timeDifference = nextClassEndTime - currentTime;

    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    let countdownText = `${seconds}s`;

    if (minutes > 0) {
        countdownText = `${minutes}m ${seconds}s`;
    }

    if (hours > 0) {
        countdownText = `${hours}h ${minutes}m ${seconds}s`;
    }

    document.getElementById('schedule-clock').innerText = countdownText;
    document.getElementById('current-class').innerText = `Currently in: ${classCurrently}`;

    // Lunch Schedule 
    let nextLunchEndTime = null;
    let lunchCurrently = null;
    for (const lunchPeriod of currentschedule.lunches) {
        const endTime = lunchPeriod.endTime;
        if (endTime > currentTime) {
            nextLunchEndTime = endTime;
            lunchCurrently = lunchPeriod.name;
            break;
        }
    }

    if (!nextLunchEndTime) {
        document.getElementById('lunch-clock').innerText = "All lunches have been finished!";
        document.getElementById('current-lunch').innerText = '';
        return;
    }

    let lunchDiff = nextLunchEndTime - currentTime;

    const Lminutes = Math.floor((lunchDiff % (1000 * 60 * 60)) / (1000 * 60));
    const Lseconds = Math.floor((lunchDiff % (1000 * 60)) / 1000);

    let LcountdownText = `${Lminutes}m ${Lseconds}s`;

    if (Lminutes <= 0){
        LcountdownText = `${Lseconds}s`;
    }
    document.getElementById('lunch-clock').innerText = LcountdownText;
    document.getElementById('current-lunch').innerText = `Current lunch: ${lunchCurrently}`;
}

setInterval(UpdateCountdowns, 1000);

updateScheduleDisplay();
UpdateCountdowns();
