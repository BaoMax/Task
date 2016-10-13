var wrap = document.querySelector('.days'),
    detail = document.querySelector('.tody-detail');
var c = new Calendar(wrap, detail);
var selects = document.querySelectorAll('select');

function bindEvent() {
    selects[0].addEventListener('change', function() {
        c.setYear(this.value);
    });
    selects[1].addEventListener('change', function() {
        c.setMonth(this.value);
    });

    var preYear = document.querySelector('.year .pre');
    preYear.addEventListener('click', function() {
        c.preYear();
    });
    var nextYear = document.querySelector('.year .next');
    preYear.addEventListener('click', function() {
        c.nextYear();
    });

    var preMonth = document.querySelector('.month .pre');
    preYear.addEventListener('click', function() {
        c.preMonth();
    });
    var nextMonth = document.querySelector('.month .next');
    preYear.addEventListener('click', function() {
        c.nextMonth();
    });

    var today = document.querySelector('.today');
    today.addEventListener('click', function() {
        var date = new Date();
        selects[0].value = date.getFullYear();
        selects[1].value = date.getMonth() + 1;
        c.goToday();
    });

    wrap.addEventListener('click', function(e) {
        var target = e.target;
        var name = target.nodeName.toUpperCase();
        if (name === 'SPAN') {
            var node = target;
        } else if (name === 'P') {
            var node = target.parentElement;
        }
        var day = parseInt(node.querySelector('p').innerHTML);
        this.querySelector('.selected').className = 'normal';
        node.className = 'selected';
        c.setDay(day);
    });
}

function formatTime(date) {
    var h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
    var m = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
    var s = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
    return [h, m, s].join(':');
}

function init() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var now = document.getElementById('now');
    selects[0].value = year;
    selects[1].value = month;
    now.innerHTML = formatTime(date);
    var fun = function() {
        date = new Date();
        now.innerHTML = formatTime(date);
        setTimeout(fun, 1000);
    }
    setTimeout(fun, 1000);
    c.render();

    bindEvent();
}

init();