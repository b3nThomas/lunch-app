const tools = require('./tools.js');

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
