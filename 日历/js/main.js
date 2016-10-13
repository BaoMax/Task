var wrap = document.querySelector('.days'),
    detail = document.querySelector('.tody-detail');
var c = new Calendar(wrap, detail, new Date(2016, 9, 16));
var selects = document.querySelectorAll('select');

function bindEvent() {
    selects[0].addEventListener('change', function() {
        c.setYear(parseInt(this.value));
    });
    selects[1].addEventListener('change', function() {
        c.setMonth(parseInt(this.value));
    });

    var preYear = document.querySelector('.year .pre');
    preYear.addEventListener('click', function() {
        if (selects[0].value > 1901) {
            selects[0].value = parseInt(selects[0].value) - 1;
        }
        c.preYear();
    });
    var nextYear = document.querySelector('.year .next');
    nextYear.addEventListener('click', function() {
        if (selects[0].value < 2100) {
            selects[0].value = parseInt(selects[0].value) + 1;
        }
        c.nextYear();
    });

    var preMonth = document.querySelector('.month .pre');
    preMonth.addEventListener('click', function() {
        if (selects[1].value > 1) {
            selects[1].value = parseInt(selects[1].value) - 1;
        }
        c.preMonth();
    });
    var nextMonth = document.querySelector('.month .next');
    nextMonth.addEventListener('click', function() {
        if (selects[1].value < 12) {
            selects[1].value = parseInt(selects[1].value) + 1;
        }
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

        var select = this.querySelector('.selected');
        select.className = select.className.replace('selected', 'normal')
        node.className = [node.className, 'selected'].join(' ');
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