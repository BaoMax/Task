var Dialog = function() {
    this.wrap = document.createElement('div');
    this.wrap.className = 'dialog hide';
    this.box = document.createElement('div');
    this.box.className = 'box';
    this.wrap.appendChild(this.box);
}
Dialog.prototype.create = function(str) {
    this.box.innerHTML = str;
    document.body.appendChild(this.wrap);
}
Dialog.prototype.show = function() {
    removeClass(this.wrap, 'hide');
}
Dialog.prototype.hide = function() {
    document.body.removeChild(this.wrap);
    // addClass(this.wrap, 'hide');
}