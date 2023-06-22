import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
const daysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minutesEl = document.querySelector('.value[data-minutes]');
const secondsEl = document.querySelector('.value[data-seconds]');

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];

        if (selectedDate <= new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            startBtn.disabled = false;
        }
    },
};

flatpickr(dateTimePicker, options);

let countdownInterval = null;

startBtn.addEventListener('click', () => {
    const selectedDate = new Date(dateTimePicker.value);

    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(() => {
        const currentDate = new Date();
        const differenceMs = selectedDate - currentDate;

        if (differenceMs <= 0) {
            clearInterval(countdownInterval);
            return;
        }

        const timeLeft = convertMs(differenceMs);

        daysEl.textContent = addLeadingZero(timeLeft.days);
        hoursEl.textContent = addLeadingZero(timeLeft.hours);
        minutesEl.textContent = addLeadingZero(timeLeft.minutes);
        secondsEl.textContent = addLeadingZero(timeLeft.seconds);
    }, 1000);
});
