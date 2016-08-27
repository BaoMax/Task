function addEvent(ele, type, handler) {
    if (ele.addEventListener) {
        ele.addEventListener(type, handler);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + type, handler);
    }
}