getElement = (selector) => {
    return document.querySelector(selector);
}

setInnerText = (selector, content) => {
    return getElement(selector).innerText = content;
}

exports.getElement = getElement;
exports.setInnerText = setInnerText;
