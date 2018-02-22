/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

getElement = (selector) => {
    return document.querySelector(selector);
}

setInnerText = (selector, content) => {
    return getElement(selector).innerText = content;
}

exports.getElement = getElement;
exports.setInnerText = setInnerText;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const tools = __webpack_require__(2);

const emojis = {
    mains: ['🍔', '🌭', '🌮', '🌯', '🍗', '🍕', '🥓', '🍤', '🍖', '🍝', '🍜', '🥙', '🍛'],
    sides: ['🍟', '🍳', '🥚', '🧀', '🥖', '🍞', '🍅', '🍆', '🥒', '🥕', '🌽', '🥔', '🍠', '🥗', '🍱'],
    sweets: [ '🥐', '🥞', '🍰', '🍭', '🍬', '🍫', '🍿', '🍩', '🍦', '🍪'],
    fruits: ['🍎', '🍐', '🍊', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🍍', '🥝', '🥑'],
    drinks: ['🥛', '☕️', '🍺', '🍷', '🥃', '🍸', '🍹', '🍾']
};

getRandom = (num) => {
    const all = emojis.mains.concat(emojis.sides, emojis.sweets, emojis.fruits, emojis.drinks);
    return tools.shuffleArray(all).slice(0, (num || 1)).join(' ');
}

getMeal = () => {
    return [
        tools.shuffleArray(emojis.mains)[0],
        tools.shuffleArray(emojis.sides)[0],
        tools.shuffleArray(emojis.fruits)[0],
        tools.shuffleArray(emojis.sweets)[0],
        tools.shuffleArray(emojis.drinks)[0]
    ].join(' ');
}

exports.getRandom = getRandom;
exports.getMeal = getMeal;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const dom = __webpack_require__(0);
const emoji = __webpack_require__(1);

// Fisher-Yates Shuffle Algorithm
shuffleArray = (arr) => {
    let currentIndex = arr.length;
    let randIndex;
    let tempValue;

    while (currentIndex !== 0) {
        randIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempValue = arr[currentIndex];
        arr[currentIndex] = arr[randIndex];
        arr[randIndex] = tempValue;
    }
    return arr;
}

timer = (hours, minutes, target) => {
    let timeLeft = '';
    let timeDiff = 0;

    const getTime = () => {
        const now = new Date();
        const targetDate = now.toString().replace(/(\d{2}:\d{2}:\d{2})/, `${ hours }:${ minutes }:00`);
        timeDiff = new Date(targetDate).getTime() - now.getTime();

        const h = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((timeDiff % (1000 * 60)) / 1000);

        let hoursStr = h.toString();
        let minutesStr = m.toString();
        let secondsStr = s.toString();

        if (h < 10) {
            hoursStr = `0${hoursStr}`;
        }
        if (m < 10) {
            minutesStr = `0${minutesStr}`;
        }
        if (s < 10) {
            secondsStr = `0${secondsStr}`;
        }
        timeLeft = `${ hoursStr }h ${ minutesStr }m ${ secondsStr }s`;
        return timeLeft;
    };

    const int = setInterval(() => {
        if (timeDiff < 1000) {
            dom.setInnerText(target, `It's Lunchtime!`);
            const audio = new Audio('https://www.hallelujah-chorus.com/audio/hallelujah-chorus-9MB.mp3');
            audio.play();
            stop();
            setInterval(() => {
                dom.setInnerText('#suggest-emojis', emoji.getMeal());
            }, 500);
            dom.getElement('body').classList.add('blink');
        } else {
            dom.setInnerText(target, getTime());   
        }
    }, 1000);

    const stop = () => {
        clearInterval(int);
    };

    getTime();

    if (timeDiff < 0) {
        dom.setInnerText(target, `Sorry but you missed lunch today 😭`);
        const audio = new Audio('http://soundbible.com/grab.php?id=1830&type=mp3');
        audio.play();
        stop();
    } else {
        dom.setInnerText(target, timeLeft);
    }

};


exports.shuffleArray = shuffleArray;
exports.timer = timer;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const dom = __webpack_require__(0);
const emoji = __webpack_require__(1);
const tools = __webpack_require__(2);


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


/***/ })
/******/ ]);