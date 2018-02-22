const dom = require('./dom.js');
const emoji = require('./emojis.js');

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
