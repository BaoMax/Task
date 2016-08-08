/*
@class {Banner} 轮播控件
@param {Object} 配置参数
*/
function Banner(opt) {
    // 容器
    this.wrap = opt.wrap || document.body;
    // 正序还是倒序
    this.order = opt.order || true;
    // 是否循环
    this.isLoop = opt.isLoop || true;
    // 间隔时长
    this.duration = opt.duration || 1;
    // 控制小点
    this.pointList = [];
    // 当前的index
    this.currentIndex = this.order ? 0 : this.num - 1;
    // 图片列表
    this.itemList = opt.itemList;
    this.num = this.itemList.length;
    // 动画
    this.type = getAnimation();
    this.animation = this.type + "ransition:all " + this.duration + " ease-in)";
    this.timer = null;

    this.init();
}
Banner.prototype.init = function() {
    this.setImag();
    this.drawPoint();
    this.changeImag();
}
Banner.prototype.setImag = function() {
    var that = this;
    [].forEach.call(this.itemList, function(item, index) {
        that.itemList[index].style.display = "none";
        that.itemList[index].style[this.type + "ransition"] = this.animation;
        that.itemList[index].addEventListener("transitionend", this.changeImag, false);
    });
    this.itemList[this.currentIndex].style.display = "block";
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
Banner.prototype.changeImag = function() {
    if (this.order) {
        this.currentIndex += 1;
        if (this.isLoop && this.currentIndex >= this.num) {
            this.currentIndex = 0;
        } else if (!this.isLoop && this.currentIndex >= this.num) {
            clearInterval(this.timer);
            this.timer = null;
            return;
        }
    } else {
        this.currentIndex -= 1;
        if (this.isLoop && this.currentIndex <= 0) {
            this.currentIndex = num - 1;
        } else if (!this.isLoop && this.currentIndex <= 0) {
            clearInterval(this.timer);
            this.timer = null;
            return;
        }
    }

    this.setImag();
}

function getAnimation() {
    var d = document.createElement("div"),
        style = d.style,
        arr = ["t", "webkitT", "mozT", "oT"];
    arr.forEach(function(item, index) {
        var temp = item + "ransition";
        if (temp in style) {
            return item;
        }
    });
}