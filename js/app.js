const dom = require('./dom.js');
const emoji = require('./emojis.js');
const tools = require('./tools.js');


window.onload = () => {
    const suggestButton = dom.getElement('#suggest button');
    const timer = {
        countdownButton: dom.getElement('#timer-countdown-btn'),
        selector: dom.getElement('#timer-selector'),
        startButton: dom.getElement('#timer-start-btn'),
        countdownClock: dom.getElement('#timer-countdown-clock'),
        resetButton: dom.getElement('#timer-reset-btn')
    };

    suggestButton.addEventListener('click', () => {
        dom.setInnerText('#suggest-emojis', emoji.getMeal());
    });

    timer.countdownButton.addEventListener('click', () => {
        timer.countdownButton.classList.add('hidden');
        timer.selector.classList.remove('hidden');
        timer.startButton.classList.remove('hidden');
    });

    timer.startButton.addEventListener('click', () => {

        timer.selector.classList.add('hidden');
        timer.startButton.classList.add('hidden');
        timer.countdownClock.classList.remove('hidden');
        timer.resetButton.classList.remove('hidden');

        const hours = dom.getElement('#timer-selector-hours').value;
        const mins = dom.getElement('#timer-selector-mins').value;

        tools.timer(hours, mins, '#timer-countdown-clock');
    });

    timer.resetButton.addEventListener('click', () => {
        timer.countdownClock.classList.add('hidden');
        timer.resetButton.classList.add('hidden');
        timer.selector.classList.remove('hidden');
        timer.startButton.classList.remove('hidden');
    });

}
