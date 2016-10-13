var Calendar = function(wrap, detailContainer, date) {
    this.date = date || new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    this.day = this.date.getDate();
    this.week = this.date.getDay();
    this.lunarObj = ChineseCalendar.date2lunar(this.date);
    this.wrap = wrap;
    this.detailContainer = detailContainer;
}
Calendar.prototype.isSameDay = function(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}
Calendar.prototype.formDate = function() {
    return this.year + '年' + this.month + '年' + this.day + '日';
}
Calendar.prototype.date2arr = function() {
    var array = [];
    var date = new Date(this.date);
    date.setDate(1);
    var week = date.getDay();
    date.setDate(1 - week + 1);
    var month = date.getMonth() + 1;
    while (month <= this.month) {
        if (month < this.month) {
            array.push({
                day: date.getDate(),
                lunarDay: ChineseCalendar.lunarTime(date),
                state: 'expired'
            });
        } else if (this.isSameDay(date, this.date)) {
            array.push({
                day: date.getDate(),
                lunarDay: ChineseCalendar.lunarTime(date),
                state: 'selected'
            });
        } else {
            array.push({
                day: date.getDate(),
                lunarDay: ChineseCalendar.lunarTime(date),
                state: 'normal'
            });
        }
        date.setDate(date.getDate() + 1);
        month = date.getMonth() + 1;
    }
    return array;
}
Calendar.prototype.renderCalender = function() {
    var array = this.date2arr();
    var str = '';
    for (var i = 0, l = array.length; i < l; i += 1) {
        var temp = array[i];
        str += '<span class="' + temp.state + '"><p>' + temp.day + '</p><p>' + temp.lunarDay + '</p></span>';
    }
    this.wrap.innerHTML = str;

    str = '';
    str += '<p>' + this.formDate() + '</p><p>' + this.lunarObj.week + '</p><p class="big-day">' + this.day + '</p><p>农历' + this.lunarObj.lunarMonthChiness + this.lunarObj.lunarDayChiness + '</p><p>' + this.lunarObj.gzY + '年</p><p>' + this.lunarObj.gzM + '月' + this.lunarObj.gzD + '日</p><p>生肖：' + this.lunarObj.animal + '</p><p>星座：' + this.lunarObj.start + '</p>';
    this.detailContainer.innerHTML = str;
}
Calendar.prototype.renderDetail = function() {
    var str = '';

    str += '<p>' + this.formDate() + '</p><p>' + this.lunarObj.week + '</p><p class="big-day">' + this.day + '</p><p>农历' + this.lunarObj.lunarMonthChiness + this.lunarObj.lunarDayChiness + '</p><p>' + this.lunarObj.gzY + '年</p><p>' + this.lunarObj.gzM + '月' + this.lunarObj.gzD + '日</p><p>生肖：' + this.lunarObj.animal + '</p><p>星座：' + this.lunarObj.start + '</p>';
    this.detailContainer.innerHTML = str;
}
Calendar.prototype.render = function() {
    this.renderCalender();
    this.renderDetail();
}
Calendar.prototype.setYear = function(year) {
    this.year = year;
    this.date = new Date(this.year, this.month - 1, this.day);
    this.week = this.date.getDay();
    this.lunarObj = ChineseCalendar.date2lunar(this.date);
    this.render();
}
Calendar.prototype.setMonth = function(month) {
    this.month = month;
    this.date = new Date(this.year, this.month - 1, this.day);
    this.week = this.date.getDay();
    this.lunarObj = ChineseCalendar.date2lunar(this.date);
    this.render();
}
Calendar.prototype.setDay = function(day) {
    this.day = day;
    this.date = new Date(this.year, this.month - 1, this.day);
    this.week = this.date.getDay();
    this.lunarObj = ChineseCalendar.date2lunar(this.date);
    this.renderDetail();
}
Calendar.prototype.preYear = function() {
    if (this.year === 1901) {
        return;
    }
    this.setYear(ths.year - 1);
}
Calendar.prototype.nextYear = function() {
    if (this.year === 2100) {
        return;
    }
    this.setYear(this.year + 1);
}
Calendar.prototype.preMonth = function() {
    if (this.month === 1) {
        return;
    }
    this.setMonth(ths.month - 1);
}
Calendar.prototype.nextMonth = function() {
    if (this.month === 12) {
        return;
    }
    this.setMonth(ths.month + 1);
}
Calendar.prototype.goToday = function() {
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    this.day = this.date.getDate();
    this.week = this.date.getDay();
    this.lunarObj = ChineseCalendar.date2lunar(this.date);
    this.render();
}