/*
@class {Banner} 轮播控件
@param {Object} 配置参数
*/
function Banner(opt) {
    // 容器
    this.wrap = opt.wrap || document.body;
    // 正序还是倒序
    this.order = opt.order;
    // 宽度
    this.width = opt.width || 259;
    this.width = this.order ? -1 * this.width : this.width;
    // 是否循环
    this.isLoop = opt.isLoop;
    // 间隔时长
    this.duration = opt.duration || 3;
    // 控制小点
    this.pointList = [];
    // 图片列表
    this.itemList = opt.itemList;
    this.num = this.itemList.length;
    this.parent = this.itemList[0].parentElement;
    // 当前的index
    this.currentIndex = this.order ? 0 : this.num - 1;
    // 动画
    this.type = getAnimation();
    this.animation = "all " + this.duration + "s ease-in 0s";
    this.timer = null;

    this.event = this.changeImag.bind(this);
    this.init();
}
Banner.prototype.init = function() {
    this.initAnimation();
    this.drawPoint();
    setTimeout(this.changeImag.bind(this), this.duration * 1000);
    this.setPoint();
    this.pointEvents();
}
Banner.prototype.setDisplay = function() {
    for (var i = 0, l = this.itemList.length; i < l; i += 1) {
        this.itemList[i].style.display = "none";
    }
}
Banner.prototype.initAnimation = function() {
    this.parent.style[this.type + "ransition"] = this.animation;
    this.parent.addEventListener(this.type + "ransitionend", this.event, false);
    this.itemList[this.currentIndex].style.display = "inline";
    this.itemList[this.currentIndex].style.left = "0px;"
}
Banner.prototype.setImag = function() {
    var currentItem = this.itemList[this.currentIndex],
        perItem = this.order ? this.itemList[(this.currentIndex - 1 + this.num) % this.num] : this.itemList[(this.currentIndex + 1) % this.num],
        left = parseInt(getComputedStyle(this.parent).left);
    this.setDisplay();
    perItem.style.display = "inline";
    perItem.style.left = -1 * left + "px";
    currentItem.style.display = "inline";
    currentItem.style.left = -1 * left - this.width + "px";
    this.parent.style.left = left + this.width + "px";
}
Banner.prototype.drawPoint = function() {
    var round = document.createElement("div");
    round.id = "round";
    for (var i = 0, l = this.itemList.length; i < l; i += 1) {
        var node = document.createElement("span");
        node.className = "point";
        round.appendChild(node);
        this.pointList.push(node);
    }
    this.pointList[this.currentIndex].className += " selected";
    this.wrap.appendChild(round);
}
Banner.prototype.setPoint = function() {
    for (var i = 0, l = this.pointList.length; i < l; i += 1) {
        this.pointList[i].className = "point";
    }
    this.pointList[this.currentIndex].className = "point select";
}
Banner.prototype.pointEvents = function() {
    for (var i = 0, l = this.pointList.length; i < l; i += 1) {
        var that = this;
        this.pointList[i].addEventListener("click", (function() {
            var t = i;
            return function() {
                var left = parseInt(getComputedStyle(that.parent).left),
                    j = 0;
                that.setDisplay();
                while (that.currentIndex !== t) {
                    that.itemList[that.currentIndex].style.left = -1 * left - j * that.width + "px";
                    that.itemList[that.currentIndex].style.display = "inline";
                    that.currentIndex = that.order ? (that.currentIndex + 1) % that.num : (that.currentIndex - 1 + that.num) % that.num;
                    j++;
                }
                that.itemList[that.currentIndex].style.left = -1 * left - j * that.width + "px";
                that.itemList[that.currentIndex].style.display = "inline";

                that.parent.style.left = left + that.width * j + "px";
                
                that.setPoint();
                that.parent.removeEventListener(that.type + "ransitionend", that.event, false);
                that.parent.addEventListener(that.type + "ransitionend", that.event, false);
            };
        })(i), false);
    }
}
Banner.prototype.changeImag = function() {
    if (this.order) {
        this.currentIndex += 1;
        if (this.isLoop && this.currentIndex >= this.num - 1) {
            this.currentIndex = 0;
        } else if (!this.isLoop && this.currentIndex >= this.num - 1) {
            this.parent.removeEventListener(this.type + "ransitionend", this.event, false);
        }
        if (this.currentIndex > this.num - 1) {
            this.currentIndex = this.num - 1;
            return;
        }
    } else {
        this.currentIndex -= 1;
        if (this.isLoop && this.currentIndex <= 0) {
            this.currentIndex = this.num - 1;
        } else if (!this.isLoop && this.currentIndex <= 0) {
            this.parent.removeEventListener(this.type + "ransitionend", this.event, false);
        }
        if (this.currentIndex < 0) {
            this.currentIndex = 0;
            return;
        }
    }

    this.setPoint();
    this.setImag();
}

function getAnimation() {
    var d = document.createElement("div"),
        style = d.style,
        arr = ["t", "webkitT", "mozT", "oT"];
    for (var i = 0, l = arr.length; i < l; i += 1) {
        var temp = arr[i] + "ransition";
        if (temp in style) {
            return arr[i];
        }
    }
}