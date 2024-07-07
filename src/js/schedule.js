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
const SubTitle = document.getElementById('sub-header');
function fetchJson(CurrentClass) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        try {
            const response = yield fetch('../json/classes.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            console.log(data);
            const schedule = data[CurrentClass];
            console.log(`Current Class Data: ${JSON.stringify(schedule)}`);
            if (SubTitle) {
                SubTitle.textContent = schedule.title + " Schedule";
            }
            if (firstElement) {
                const firstClass = schedule.classes.find(cls => cls.id === '1st');
                firstElement.textContent = ((_a = firstClass === null || firstClass === void 0 ? void 0 : firstClass.name) !== null && _a !== void 0 ? _a : '') + ' ' + ((_b = firstClass === null || firstClass === void 0 ? void 0 : firstClass.interval) !== null && _b !== void 0 ? _b : '');
            }
            if (secondElement) {
                const secondClass = schedule.classes.find(cls => cls.id === '2nd');
                secondElement.textContent = ((_c = secondClass === null || secondClass === void 0 ? void 0 : secondClass.name) !== null && _c !== void 0 ? _c : '') + ' ' + ((_d = secondClass === null || secondClass === void 0 ? void 0 : secondClass.interval) !== null && _d !== void 0 ? _d : '');
            }
            if (thirdElement) {
                const thirdClass = schedule.classes.find(cls => cls.id === '3rd');
                thirdElement.textContent = ((_e = thirdClass === null || thirdClass === void 0 ? void 0 : thirdClass.name) !== null && _e !== void 0 ? _e : '') + ' ' + ((_f = thirdClass === null || thirdClass === void 0 ? void 0 : thirdClass.interval) !== null && _f !== void 0 ? _f : '');
            }
            if (fourthElement) {
                const fourthClass = schedule.classes.find(cls => cls.id === '4th');
                fourthElement.textContent = ((_g = fourthClass === null || fourthClass === void 0 ? void 0 : fourthClass.name) !== null && _g !== void 0 ? _g : '') + ' ' + ((_h = fourthClass === null || fourthClass === void 0 ? void 0 : fourthClass.interval) !== null && _h !== void 0 ? _h : '');
            }
            if (fifthElement) {
                const fifthClass = schedule.classes.find(cls => cls.id === '5th');
                fifthElement.textContent = ((_j = fifthClass === null || fifthClass === void 0 ? void 0 : fifthClass.name) !== null && _j !== void 0 ? _j : '') + ' ' + ((_k = fifthClass === null || fifthClass === void 0 ? void 0 : fifthClass.interval) !== null && _k !== void 0 ? _k : '');
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
function dropdownChange(event) {
    const selectElement = event.target;
    const selectedValue = selectElement.value;
    localStorage.setItem("Current-Schedule", selectedValue);
    console.log(`Selected value: ${selectedValue}`);
    currentSchedule(localStorage.getItem("Current-Schedule"));
}
function currentSchedule(previousSelectedSchedule) {
    if (previousSelectedSchedule) {
        fetchJson(previousSelectedSchedule);
    }
    else {
        localStorage.setItem("Current-Schedule", "Regular");
        fetchJson("Regular");
    }
    console.log(`Current Schedule from localStorage: ${previousSelectedSchedule}`);
}
currentSchedule(localStorage.getItem("Current-Schedule"));
(_a = document.getElementById('dropdown')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', dropdownChange);
export {};
