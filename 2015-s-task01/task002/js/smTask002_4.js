/*
允许使用鼠标点击选中提示栏中的某个选项
允许使用键盘上下键来选中提示栏中的某个选项，回车确认选中
选中后，提示内容变更到输入框中
*/
var data = ['text', 'text1', 'text12', 'text123', 'text1234', 'text12345'];
var dataset = function(obj) {
    this.wrap = obj.wrap;
    this.input = obj.input;
    this.list = document.createElement("ul");
    this.list.className = "list hide";
    this.wrap.appendChild(this.list);
    this.value = this.input.value;
    this.pos = -1;
    this.pre = -1;
    this.additem = function() {
        var str = "";
        for (var i = 0, l = data.length; i < l; i += 1) {
            str += "<li>" + data[i] + "</li>";
        }
        this.list.innerHTML = str;
    };
    this.input.addEventListener("keyup", function(e) {
        var t = e.target;
        if (t.value === "") {
            addClass(this.list, "hide");
        } else {
            removeClass1(this.list, "hide");
        }
        if (e.keyCode !== 40 && e.keyCode !== 38) {
            this.value = this.input.value;
        }
    }.bind(this));
    this.input.addEventListener("keyup", function(e) {
        var css = getComputedStyle(this.list),
            items = this.list.getElementsByTagName("li");
        if (css.display !== "none") {
            this.pre = this.pos;
            if (this.pre > -1 && this.pre < items.length) {
                removeClass1(items[this.pre], "select");
            }
            if (e.keyCode === 40) {
                if (this.pos < items.length - 1) {
                    addClass(items[++this.pos], "select");
                    this.input.value = items[this.pos].innerText;
                } else {
                    this.input.value = this.value;
                    this.pos = -1;
                }
            } else if (e.keyCode === 38) {
                if (this.pos > 0) {
                    addClass(items[--this.pos], "select");
                    this.input.value = items[this.pos].innerText;
                } else {
                    this.input.value = this.value;
                    this.pos = items.length;
                }
            }
        }
    }.bind(this));
    this.list.addEventListener("mouseover", function(e) {
        var target = e.target;
        if (target.nodeName.toUpperCase() === "LI") {
            this.input.value = target.innerText;
        }
    }.bind(this));
    this.list.addEventListener("mouseout", function(e) {
        var css = getComputedStyle(this.list);
        if (css.display !== "none") {
            this.input.value = this.value;
        }
    }.bind(this));
    this.list.addEventListener("click", function(e) {
        var target = e.target;
        if (target.nodeName.toUpperCase() === "LI") {
            this.input.value = target.innerText;
            addClass(this.list, "hide");
            this.input.focus();
        }
    }.bind(this));
    this.additem();
};
var d = new dataset({
    wrap: $("#wrap"),
    input: $("#input")
});