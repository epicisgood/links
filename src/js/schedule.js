var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const firstElement = document.getElementById('1st');
const secondElement = document.getElementById('2nd');
const thirdElement = document.getElementById('3rd');
const fourthElement = document.getElementById('4th');
const fifthElement = document.getElementById('5th');
const FirstSpanElement = document.getElementById('1st-interval');
const secondSpanElement = document.getElementById('2nd-interval');
const thirdSpanElement = document.getElementById('3rd-interval');
const fourthSpanElement = document.getElementById('4th-interval');
const fifthSpanElement = document.getElementById('5th-interval');
const SubTitle = document.getElementById('sub-header');
const dropdown = document.getElementById('dropdown');
const ClockDateEleemnt = document.getElementById("clock-date");
const ClockTimerElement = document.getElementById("clock-timer");
const ClockScheduleTimer = document.getElementById("clock-schedule");
const ClassEnd = document.getElementById("class-end");
const Classes = {
    Regular: {
        // testing: "10:00 PM",
        // BreakfestBell: "7:30 AM",
        FirstClassStart: "7:35 AM",
        FirstClassEnd: "8:55 AM",
        SecondClassStart: "9:00 AM",
        SecondClassEnd: "10:20 AM",
        BreakStart: "10:20 AM",
        BreakEnd: "10:55 AM",
        ThirdClassStart: "11:00 AM",
        ThirdClassEnd: "12:55 PM",
        FourthClassStart: "1:00 PM",
        FourthClassEnd: "2:20 PM",
    },
    earlyDismissal: {
        // testing: "10:00 PM",
        // BreakfestBell: "7:30 AM",
        FirstClassStart: "7:35 AM",
        FirstClassEnd: "8:25 AM",
        SecondClassStart: "8:30 AM",
        SecondClassEnd: "9:20 AM",
        ThirdClassStart: "9:25 AM",
        ThirdClassEnd: "10:15 AM",
        FourthClassStart: "10:20 AM",
        FourthClassEnd: "11:15 AM",
    },
    twoHourDelay: {
        // testing: "10:00 PM",
        // BreakfestBell: "9:30 AM",
        FirstClassStart: "9:35 AM",
        FirstClassEnd: "10:30 AM",
        SecondClassStart: "10:35 AM",
        SecondClassEnd: "11:30 AM",
        ThirdClassStart: "11:35 AM",
        ThirdClassEnd: "1:25 PM",
        FourthClassStart: "1:30 PM",
        FourthClassEnd: "2:20 PM",
    },
    pepRally: {
        // testing: "10:00 PM",
        // BreakfestBell: "7:30 AM",
        FirstClassStart: "7:35 AM",
        FirstClassEnd: "8:40 AM",
        SecondClassStart: "8:45 AM",
        SecondClassEnd: "9:50 AM",
        ThirdClassStart: "9:55 AM",
        ThirdClassEnd: "11:01 AM",
        FourthClassStart: "11:06 AM",
        FourthClassEnd: "1:08 PM",
        FifthClassStart: "1:10 PM",
        FifthClassEnd: "2:20 PM",
    }
};
function dropdownChange(event) {
    const selectElement = event.target;
    const selectedValue = selectElement.value;
    localStorage.setItem("Current-Schedule", selectedValue);
    currentSchedule(localStorage.getItem("Current-Schedule"));
}
function fetchJson(CurrentClass) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('../json/classes.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            const schedule = data[CurrentClass];
            const scheduleString = JSON.stringify(schedule);
            return scheduleString;
        }
        catch (error) {
            console.error("something happend" + error);
        }
    });
}
function currentSchedule(previousSelectedSchedule) {
    return __awaiter(this, void 0, void 0, function* () {
        let scheduleString;
        if (previousSelectedSchedule) {
            scheduleString = yield fetchJson(previousSelectedSchedule);
            dropdown.value = previousSelectedSchedule;
        }
        else {
            localStorage.setItem("Current-Schedule", "Regular");
            dropdown.value = "Regular";
            scheduleString = yield fetchJson("Regular");
        }
        if (typeof scheduleString === 'string') {
            const schedule = JSON.parse(scheduleString);
            DisplayElementsSchedule(schedule);
        }
    });
}
function DisplayElementsSchedule(schedule) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    SubTitle.textContent = schedule.title + " Schedule";
    const firstClass = schedule.classes.find(schedule => schedule.id === '1st');
    firstElement.textContent = ((_a = firstClass === null || firstClass === void 0 ? void 0 : firstClass.name) !== null && _a !== void 0 ? _a : '');
    FirstSpanElement.textContent = ((_b = firstClass === null || firstClass === void 0 ? void 0 : firstClass.interval) !== null && _b !== void 0 ? _b : '');
    const secondClass = schedule.classes.find(schedule => schedule.id === '2nd');
    secondElement.textContent = ((_c = secondClass === null || secondClass === void 0 ? void 0 : secondClass.name) !== null && _c !== void 0 ? _c : '');
    secondSpanElement.textContent = ((_d = secondClass === null || secondClass === void 0 ? void 0 : secondClass.interval) !== null && _d !== void 0 ? _d : '');
    const thirdClass = schedule.classes.find(schedule => schedule.id === '3rd');
    thirdElement.textContent = ((_e = thirdClass === null || thirdClass === void 0 ? void 0 : thirdClass.name) !== null && _e !== void 0 ? _e : '');
    thirdSpanElement.textContent = ((_f = thirdClass === null || thirdClass === void 0 ? void 0 : thirdClass.interval) !== null && _f !== void 0 ? _f : '');
    const fourthClass = schedule.classes.find(schedule => schedule.id === '4th');
    fourthElement.textContent = ((_g = fourthClass === null || fourthClass === void 0 ? void 0 : fourthClass.name) !== null && _g !== void 0 ? _g : '');
    fourthSpanElement.textContent = ((_h = fourthClass === null || fourthClass === void 0 ? void 0 : fourthClass.interval) !== null && _h !== void 0 ? _h : '');
    const fifthClass = schedule.classes.find(schedule => schedule.id === '5th');
    fifthElement.textContent = ((_j = fifthClass === null || fifthClass === void 0 ? void 0 : fifthClass.name) !== null && _j !== void 0 ? _j : '');
    fifthSpanElement.textContent = ((_k = fifthClass === null || fifthClass === void 0 ? void 0 : fifthClass.interval) !== null && _k !== void 0 ? _k : '');
}
function parseTime(timeStr) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    }
    else if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
}
function timeUntil(targetTime) {
    const now = new Date();
    const diffMs = targetTime.getTime() - now.getTime();
    if (diffMs < 0) {
        return "Time has already passed.";
    }
    const diffSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor(diffSeconds / 3600);
    const minutes = Math.floor((diffSeconds % 3600) / 60);
    const seconds = diffSeconds % 60;
    let returnvar;
    if (hours == 0) {
        returnvar = `${minutes}m ${seconds}s`;
    }
    else {
        returnvar = `${hours}h ${minutes}m ${seconds}s`;
    }
    return returnvar;
}
function NextClassClock() {
    return __awaiter(this, void 0, void 0, function* () {
        const variable = localStorage.getItem("Current-Schedule");
        const currentSchedule = Classes[variable];
        const scheduleTimes = [
            currentSchedule.FirstClassStart, currentSchedule.FirstClassEnd,
            currentSchedule.SecondClassStart, currentSchedule.SecondClassEnd,
            currentSchedule.ThirdClassStart, currentSchedule.ThirdClassEnd,
            currentSchedule.FourthClassStart, currentSchedule.FourthClassEnd,
            currentSchedule.FifthClassStart, currentSchedule.FifthClassEnd,
            // currentSchedule.testing,
        ];
        for (let i = 0; i < scheduleTimes.length; i++) {
            if (scheduleTimes[i] != undefined) {
                const prasedTimed = parseTime(scheduleTimes[i]);
                const TimeUntil = timeUntil(prasedTimed);
                if (!TimeUntil.includes("Time has already passed")) {
                    // if (scheduleTimes[i] === Classes[variable].testing) {
                    //     const ParantElement = FirstSpanElement.parentNode as HTMLDivElement
                    //     ParantElement.classList.add("highlight")
                    // }
                    if (scheduleTimes[i] === Classes[variable].FirstClassEnd) {
                        const ParantElement = FirstSpanElement.parentNode;
                        ParantElement.classList.add("highlight");
                    }
                    if (scheduleTimes[i] === Classes[variable].SecondClassEnd) {
                        const ParantElement = secondSpanElement.parentNode;
                        ParantElement.classList.add("highlight");
                    }
                    if (scheduleTimes[i] === Classes[variable].ThirdClassEnd) {
                        const ParantElement = thirdSpanElement.parentNode;
                        ParantElement.classList.add("highlight");
                    }
                    if (scheduleTimes[i] === Classes[variable].FourthClassEnd) {
                        const ParantElement = fourthSpanElement.parentNode;
                        ParantElement.classList.add("highlight");
                    }
                    if (scheduleTimes[i] === Classes[variable].FifthClassEnd) {
                        const ParantElement = fifthSpanElement.parentNode;
                        ParantElement.classList.add("highlight");
                    }
                    ClassEnd.textContent = "Next Class will be in";
                    ClockScheduleTimer.textContent = TimeUntil;
                    break;
                }
            }
            if (i == scheduleTimes.length - 1) {
                ClassEnd.textContent = "All Classes Have ended!";
                ClockScheduleTimer.textContent = "🎉🎉";
            }
        }
    });
}
function fetchCurrentDate() {
    const myDate = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(myDate);
    return formattedDate;
}
function CurrentTime() {
    const myDate = new Date();
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(myDate);
    return formattedDate;
}
setInterval(() => {
    ClockDateEleemnt.textContent = fetchCurrentDate(); // Current Date 
    ClockTimerElement.textContent = CurrentTime(); // AM/PM timer
    NextClassClock();
}, 1000);
currentSchedule(localStorage.getItem("Current-Schedule"));
(_a = document.getElementById('dropdown')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', dropdownChange);
export {};
