const firstElement: HTMLElement | null = document.getElementById('1st');
const secondElement: HTMLElement | null = document.getElementById('2nd');
const thirdElement: HTMLElement | null = document.getElementById('3rd');
const fourthElement: HTMLElement | null = document.getElementById('4th');
const fifthElement: HTMLElement | null = document.getElementById('5th');

const SubTitle: HTMLElement | null = document.getElementById('sub-header');


interface ClassDetail {
    id: string;
    name: string;
    endTime: number;
    interval: string;
}

interface Schedule {
    title: string;
    StartTime: number;
    classes: ClassDetail[];
}

interface ClassesData {
    [key: string]: Schedule;
}

async function fetchJson(CurrentClass: string): Promise<ClassesData | void> {
    try {
        const response = await fetch('../json/classes.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ClassesData = await response.json();
        console.log(data);

        const schedule: Schedule = data[CurrentClass];
        console.log(`Current Class Data: ${JSON.stringify(schedule)}`);

        if (SubTitle) {
            SubTitle.textContent = schedule.title + " Schedule";
        }

        if (firstElement) {
            const firstClass = schedule.classes.find(cls => cls.id === '1st');
            firstElement.textContent = (firstClass?.name ?? '') + ' ' + (firstClass?.interval ?? '');
        }
        if (secondElement) {
            const secondClass = schedule.classes.find(cls => cls.id === '2nd');
            secondElement.textContent = (secondClass?.name ?? '') + ' ' + (secondClass?.interval ?? '');
        }
        if (thirdElement) {
            const thirdClass = schedule.classes.find(cls => cls.id === '3rd');
            thirdElement.textContent = (thirdClass?.name ?? '') + ' ' + (thirdClass?.interval ?? '');
        }
        if (fourthElement) {
            const fourthClass = schedule.classes.find(cls => cls.id === '4th');
            fourthElement.textContent = (fourthClass?.name ?? '') + ' ' + (fourthClass?.interval ?? '');
        }
        if (fifthElement) {
            const fifthClass = schedule.classes.find(cls => cls.id === '5th');
            fifthElement.textContent = (fifthClass?.name ?? '') + ' ' + (fifthClass?.interval ?? '');
        }

    } catch (error) {
        console.error(error);
    }
}

function dropdownChange(event: Event): void {
    const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
    const selectedValue: string = selectElement.value;

    localStorage.setItem("Current-Schedule", selectedValue);
    console.log(`Selected value: ${selectedValue}`);
    currentSchedule(localStorage.getItem("Current-Schedule"));
}

function currentSchedule(previousSelectedSchedule: string | null): void {
    if (previousSelectedSchedule) {
        fetchJson(previousSelectedSchedule)
    } else {
        localStorage.setItem("Current-Schedule", "Regular");
        fetchJson("Regular");
    }

    console.log(`Current Schedule from localStorage: ${previousSelectedSchedule}`);
}

currentSchedule(localStorage.getItem("Current-Schedule"));

document.getElementById('dropdown')?.addEventListener('change', dropdownChange);
