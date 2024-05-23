const schedules = {
    regular: {
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
        classes: [
            { name: "A1/B5", endTime: new Date().setHours(8, 25, 0, 0), interval: "7:35 - 8:25" },
            { name: "A2/B6", endTime: new Date().setHours(9, 20, 0, 0), interval: "8:30 - 9:20" },
            { name: "A3/B7", endTime: new Date().setHours(10, 15, 0, 0), interval: "9:25 - 10:15" },
            { name: "A4/B8", endTime: new Date().setHours(11, 15, 0, 0), interval: "10:20 - 11:15" },
        ],
        lunches: []
    },
    twoHourDelay: {
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
        classes: [
            { name: "A1/B5", endTime: new Date().setHours(8, 40, 0, 0), interval: "7:35 - 8:40" },
            { name: "A2/B6", endTime: new Date().setHours(9, 50, 0, 0), interval: "8:45 - 9:50" },
            { name: "A3/B7", endTime: new Date().setHours(11, 1, 0, 0), interval: "9:55 - 11:01" },
            { name: "A4/B8", endTime: new Date().setHours(13, 8, 0, 0), interval: "11:06 - 13:08" },
            { name: "Prep Ralley Event!", endTime: new Date().setHours(14, 20, 0, 0), interval: "13:10 - 14:20" },
        ],
        lunches: [
            { name: "1st", endTime: new Date().setHours(11, 34, 0, 0), interval: "11:06 - 11:34" },
            { name: "2nd", endTime: new Date().setHours(12, 8, 0, 0), interval: "11:38 - 12:08" },
            { name: "3rd", endTime: new Date().setHours(12, 38, 0, 0), interval: "12:10 - 12:38" },
            { name: "4th", endTime: new Date().setHours(13, 8, 0, 0), interval: "12:42 - 13:08" },
        ]
    },
};



let currentschedule = schedules.regular
const scheduleSwitch = document.querySelector('.schedule-switch');
const title = document.querySelector('.schedule-titles')
const lunch_title = document.querySelector('.lunch-title')

const first_class = document.getElementById('1st-class')
const second_class = document.getElementById('2nd-class')
const third_class = document.getElementById('3rd-class')
const fourth_class = document.getElementById('4th-class')
const fifth_class = document.getElementById('5th-class')

scheduleSwitch.addEventListener('change', () => {

    const selectedValue = scheduleSwitch.value;
    currentschedule = schedules[selectedValue];

    if (selectedValue === 'regular'){
        title.innerHTML = 'Regular Schedule'
        lunch_title.innerHTML = 'Regular Lunch Schedule'
        first_class.innerHTML = currentschedule.classes[0].endTime
    }
    if (selectedValue === 'earlyDismissal'){
        title.innerHTML = 'Early Dismissal Schedule'
        lunch_title.innerHTML = 'Early Dismissal Lunch Schedule'
    }
    if (selectedValue === 'twoHourDelay'){
        title.innerHTML = '2 Hour Delay Schedule'
        lunch_title.innerHTML = `2 Hour Delay Lunch Schedule`
    }
    if (selectedValue === 'prepRalley'){
        title.innerHTML = 'Prep Ralley Schedule'
        lunch_title.innerHTML = 'Prep Ralley Lunch Schedule'
    }
    
});