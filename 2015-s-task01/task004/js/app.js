var listHtml = {};
listHtml.hash = '';
listHtml.dom = document.getElementById('body');
listHtml.render = function(data) {
    var str = '<header>todos</header>';
    str += '<ul>';
    for (var i = 0, l = data.length; i < l; i += 1) {
        str += '<li>' + data[i].title + '</li>';
    }
    str += '</ul>';
    dom.innerHTML = str;
}

var taskHtml = {};
taskHtml.hash = '#task';
taskHtml.dom = document.getElementById('body');
taskHtml.render = function(data) {
    var str = '<header><button type="button" class="back"><span><</span>返回</button>' + 任务分类1 + '</header>';
    str += '<ul>';
    for (var i = 0, l = data.length; i < l; i += 1) {
        str += '<li>' + data[i].title + '</li>';
    }
    str += '</ul>';
    dom.innerHTML = str;
}

var detailHtml = {};
detailHtml.hash = '#detail';
detailHtml.dom = document.getElementById('body');
detailHtml.render = function(data) {
    var str = '<header><button type="button" class="back"><span><</span>返回</button>' + data.title + '</header>';
    str += '<ul>';
    str += '<li>' + data.title + '</li>';
    str += '<li>' + data.date + '</li>';
    str += '</ul>';
    str += '<p>' + data.content + '</p>';
    dom.innerHTML = str;
}
var htmls = [taskHtml, detailHtml, listHtml];

function load() {

}

function hashChange() {
    var hash =
}