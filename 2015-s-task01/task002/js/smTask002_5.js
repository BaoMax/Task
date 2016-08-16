var isPressed = false,
    element = null,
    css = getComputedStyle(document.getElementsByClassName("container")[0]),
    itemCss = getComputedStyle(document.getElementsByClassName("item")[0]),
    height = parseInt(css.height, 10),
    width = parseInt(css.width, 10),
    itemHeight = parseInt(itemCss.height, 10),
    itemWidth = parseInt(itemCss.width, 10),
    container1 = $("#container1"),
    container2 = $("#container2");
$.on("#container1", "mousedown", function(e) {
    var target = e.target;
    if (target.className === "item") {
        isPressed = true;
        element = target;
    }
});
$.on("#container1", "mouseup", function(e) {
    isPressed = false;
    var p = {
        x: parseInt(element.style.left, 10),
        y: parseInt(element.style.top, 10)
    };
    getIndex(p);
});
$.on("#container2", "mousedown", function(e) {
    var target = e.target;
    if (target.className === "item") {
        isPressed = true;
        element = target;
    }
});
$.on("#container2", "mouseup", function(e) {
    isPressed = false;
    var p = {
        x: parseInt(element.style.left, 10),
        y: parseInt(element.style.top, 10)
    };
    getIndex(p);
});
document.addEventListener("mousemove", function(e) {
    if (isPressed) {
        addClass(element, "drag");
        element.style.top = e.clientY + "px";
        element.style.left = e.clientX + "px";
    }
});

function getIndex(p) {
    var index = isInContainer(container1, p);
    if (index) {
        var node = element.cloneNode(true),
            parent = element.parentElement,
            items = container1.getElementsByClassName("item");
        parent.removeChild(element);
        if (index.index >= items.length) {
            container1.appendChild(node);
        } else {
            container1.insertBefore(node, items[index.index]);
        }
        removeClass1(node, "drag");
    } else {
        index = isInContainer(container2, p);
        if (index) {
            var node = element.cloneNode(true),
                parent = element.parentElement,
                items = container2.getElementsByClassName("item");
            parent.removeChild(element);
            if (index.index >= items.length) {
                container2.appendChild(node);
            } else {
                container2.insertBefore(node, items[index.index]);
            }
            removeClass1(node, "drag");
        } else {
            removeClass1(element, "drag");
        }
    }
}

function isInContainer(container, p) {
    var position = getPosition(container),
        centerX = p.x - position.x + itemWidth / 2,
        centerY = p.y - position.y + itemHeight / 2;
    if ((centerX >= 0 && centerX <= width) && (centerY >= 0 && centerY <= height)) {
        return {
            index: Math.round(centerY / itemHeight)
        }
    } else {
        return false;
    }
}