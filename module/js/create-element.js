export function createElement(elem, attrName, attrValue) {
    const element = document.createElement(elem);
    element.setAttribute(attrName, attrValue);
    return element;
}
