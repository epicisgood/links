const firstElement = document.getElementById('1st') as HTMLSpanElement;
const secondElement = document.getElementById('2nd') as HTMLSpanElement;
const thirdElement = document.getElementById('3rd') as HTMLSpanElement;
const fourthElement = document.getElementById('4th') as HTMLSpanElement;
const fifthElement = document.getElementById('5th') as HTMLSpanElement;

const FirstSpanElement = document.getElementById('1st-interval') as HTMLSpanElement;
const secondSpanElement = document.getElementById('2nd-interval') as HTMLSpanElement;
const thirdSpanElement = document.getElementById('3rd-interval') as HTMLSpanElement;
const fourthSpanElement = document.getElementById('4th-interval') as HTMLSpanElement;
const fifthSpanElement = document.getElementById('5th-interval') as HTMLSpanElement;


const SubTitle = document.getElementById('sub-header') as HTMLHeadingElement;
const dropdown = document.getElementById('dropdown') as HTMLSelectElement;
const ClockDateEleemnt = document.getElementById("clock-date") as HTMLDivElement;
const ClockTimerElement = document.getElementById("clock-timer") as HTMLDivElement;

const ClockScheduleTimer = document.getElementById("clock-schedule") as HTMLDivElement;
const ClassEnd = document.getElementById("class-end") as HTMLDivElement



interface Schedule {
    title: string;
    classes: {
        id: string;
        name: string;
        interval: string;
    }[];
}


interface ClassesData {
    [key: string]: Schedule
}

interface ClassSchedule {
    [key: string]: {
        // testing: string,
        FirstClassStart: string;
        FirstClassEnd: string;
        SecondClassStart: string;
        SecondClassEnd: string;
        BreakStart?: string;
        BreakEnd?: string;
        ThirdClassStart: string;
        ThirdClassEnd: string;
        FourthClassStart: string;
        FourthClassEnd: string;
        FifthClassStart?: string;
        FifthClassEnd?: string;
    };
}

const Classes: ClassSchedule = {
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



function dropdownChange(event: Event): void {
    const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
    const selectedValue: string = selectElement.value;

    localStorage.setItem("Current-Schedule", selectedValue);
    currentSchedule(localStorage.getItem("Current-Schedule") as string);


}


async function fetchJson(CurrentClass: string): Promise<void | string> {
    try {
        const response = await fetch('../json/classes.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ClassesData = await response.json();

        const schedule: Schedule = data[CurrentClass];
        const scheduleString = JSON.stringify(schedule);

        return scheduleString

    } catch (error) {
        console.error("something happend" + error);
    }

}


async function currentSchedule(previousSelectedSchedule: string | null): Promise<void> {
    let scheduleString: void | string;
    if (previousSelectedSchedule) {
        scheduleString = await fetchJson(previousSelectedSchedule);
        dropdown.value = previousSelectedSchedule;
    } else {
        localStorage.setItem("Current-Schedule", "Regular");
        dropdown.value = "Regular";
        scheduleString = await fetchJson("Regular");
    }

    if (typeof scheduleString === 'string') {
        const schedule: Schedule = JSON.parse(scheduleString);
        DisplayElementsSchedule(schedule);
    }
}


function DisplayElementsSchedule(schedule: Schedule) {
    SubTitle.textContent = schedule.title + " Schedule";


    const firstClass = schedule.classes.find(schedule => schedule.id === '1st');
    firstElement.textContent = (firstClass?.name ?? '');
    FirstSpanElement.textContent = (firstClass?.interval ?? '');

    const secondClass = schedule.classes.find(schedule => schedule.id === '2nd');
    secondElement.textContent = (secondClass?.name ?? '');
    secondSpanElement.textContent = (secondClass?.interval ?? '');

    const thirdClass = schedule.classes.find(schedule => schedule.id === '3rd');
    thirdElement.textContent = (thirdClass?.name ?? '');
    thirdSpanElement.textContent = (thirdClass?.interval ?? '');

    const fourthClass = schedule.classes.find(schedule => schedule.id === '4th');
    fourthElement.textContent = (fourthClass?.name ?? '');
    fourthSpanElement.textContent = (fourthClass?.interval ?? '');

    const fifthClass = schedule.classes.find(schedule => schedule.id === '5th');
    fifthElement.textContent = (fifthClass?.name ?? '');
    fifthSpanElement.textContent = (fifthClass?.interval ?? '');
}


function parseTime(timeStr: string): Date {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }

    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
}

function timeUntil(targetTime: Date): string {
    const now = new Date();
    const diffMs = targetTime.getTime() - now.getTime();

    if (diffMs < 0) {
        return "Time has already passed.";
    }

    const diffSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor(diffSeconds / 3600);
    const minutes = Math.floor((diffSeconds % 3600) / 60);
    const seconds = diffSeconds % 60;

    let returnvar: string;

    if (hours == 0) {
        returnvar = `${minutes}m ${seconds}s`
    } else {
        returnvar = `${hours}h ${minutes}m ${seconds}s`
    }

    return returnvar;
}

async function NextClassClock(): Promise<void> {
    const variable = localStorage.getItem("Current-Schedule") as string;

    const currentSchedule = Classes[variable];


    const scheduleTimes: (string | undefined)[] = [
        currentSchedule.FirstClassStart, currentSchedule.FirstClassEnd,
        currentSchedule.SecondClassStart, currentSchedule.SecondClassEnd,
        currentSchedule.ThirdClassStart, currentSchedule.ThirdClassEnd,
        currentSchedule.FourthClassStart, currentSchedule.FourthClassEnd,
        currentSchedule.FifthClassStart, currentSchedule.FifthClassEnd,
        // currentSchedule.testing,
    ];


    for (let i = 0; i < scheduleTimes.length; i++) {
        if (scheduleTimes[i] != undefined) {


            const prasedTimed = parseTime(scheduleTimes[i] as string)
            const TimeUntil = timeUntil(prasedTimed)


            if (!TimeUntil.includes("Time has already passed")) {
                // if (scheduleTimes[i] === Classes[variable].testing) {
                //     const ParantElement = FirstSpanElement.parentNode as HTMLDivElement
                //     ParantElement.classList.add("highlight")
                // }

                if (scheduleTimes[i] === Classes[variable].FirstClassEnd) {
                    const ParantElement = FirstSpanElement.parentNode as HTMLDivElement
                    ParantElement.classList.add("highlight")
                }
                if (scheduleTimes[i] === Classes[variable].SecondClassEnd) {
                    const ParantElement = secondSpanElement.parentNode as HTMLDivElement
                    ParantElement.classList.add("highlight")
                }
                if (scheduleTimes[i] === Classes[variable].ThirdClassEnd) {
                    const ParantElement = thirdSpanElement.parentNode as HTMLDivElement
                    ParantElement.classList.add("highlight")
                }
                if (scheduleTimes[i] === Classes[variable].FourthClassEnd) {
                    const ParantElement = fourthSpanElement.parentNode as HTMLDivElement
                    ParantElement.classList.add("highlight")
                }
                if (scheduleTimes[i] === Classes[variable].FifthClassEnd) {
                    const ParantElement = fifthSpanElement.parentNode as HTMLDivElement
                    ParantElement.classList.add("highlight")
                }
                ClassEnd.textContent = "Next Class will be in"
                ClockScheduleTimer.textContent = TimeUntil
                break
            }
        }

        if (i == scheduleTimes.length - 1) {
            ClassEnd.textContent = "All Classes Have ended!"
            ClockScheduleTimer.textContent = "🎉🎉"
        }

    }
}






function fetchCurrentDate(): string {
    const myDate = new Date();

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const formattedDate: string = new Intl.DateTimeFormat('en-US', options).format(myDate);

    return formattedDate;
}

function CurrentTime(): string {
    const myDate = new Date();


    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    const formattedDate: string = new Intl.DateTimeFormat('en-US', options).format(myDate);

    return formattedDate;
}




setInterval(() => {
    ClockDateEleemnt.textContent = fetchCurrentDate(); // Current Date 
    ClockTimerElement.textContent = CurrentTime(); // AM/PM timer

    NextClassClock()
}, 1000);



currentSchedule(localStorage.getItem("Current-Schedule"));

document.getElementById('dropdown')?.addEventListener('change', dropdownChange);

