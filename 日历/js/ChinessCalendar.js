var ChineseCalendar = {
    /**
     * 农历1900-2100的润大小信息表
     * @Array Of Property
     * @return Hex 
     * 
     * 5位16进制数代表20位2进制
     * 比如1900年代表0x04bd8二进制
     * 0000 0100 1011 1101 1000
     * 其中0-3位代表此年的闰月是大月还是小月，1为大月30天，0为小月29天
     *    4-15位代表1-12月每个月是大月还是小月，1为大月30天，0为小月29天
     *    16-20位代表此年是否闰月，如果全0代表不闰月，否则代表润的月份
     */
    lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, //1900-1909
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, //1910-1919
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, //1920-1929
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, //1930-1939
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, //1940-1949
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
        0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
        /**Add By JJonline@JJonline.Cn**/
        0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
        0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
        0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
        0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
        0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
        0x0d520
    ], //2100
    /**
     * @{array} 天干对应表
     * **/
    Gan: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
    /**
     * @{array} 地支对应表
     * **/
    Zhe: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
    /**
     * @{array} 生肖对应表
     * **/
    Animals: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
    /**
     * @{array} 24节气对应表
     * **/
    solarTerm: ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"],
    /**
     * @{array} 星期对应表
     * **/
    weekend: ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
    /**
     * @{array} 农历日期对应表
     * **/
    lunarStr: ['初', '十', '廿', '卅'],
    /**
     * @{array} 农历月份对应表
     * **/
    lunarMonStr: ['正', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'],
    /**
     * 参数为农历日期
     * @method 根据年份计算有多少天
     * @param {int} 年
     * @return {int} 天数
     * **/
    lunarYearLength: function(y) {
        var sum = 12 * 29;
        for (var i = 0x8000; i > 0x8; i = i >> 1) {
            sum += (ChineseCalendar.lunarInfo[y - 1900] & i ? 1 : 0);
        }
        sum += ChineseCalendar.leapMonthLengths(y);
        return sum;
    },
    /**
     * 参数为农历日期
     * @method 根据该年份的月份有多少天
     * @param {int} 年
     * @param {int} 月
     * @return {int} 月天数
     * **/
    lunarMonthLength: function(y, m) {
        return ChineseCalendar.lunarInfo[y - 1900] & (0x1000 >> m) ? 30 : 29;
    },
    /**
     * 参数为农历日期
     * @method 根据年份判断是否闰月
     * @param {int} 年
     * @return {boolean} 是否闰月
     * **/
    isLeapMonth: function(y) {
        return ChineseCalendar.lunarInfo[y - 1900] & 0xf ? true : false;
    },
    /**
     * 参数为农历日期
     * @method 根据年份判断闰几月
     * @param {int} 年
     * @return {boolean} 闰几月
     * **/
    leapMonth: function(y) {
        if (ChineseCalendar.isLeapMonth) {
            return ChineseCalendar.lunarInfo[y - 1900] & 0xf;
        }
        return 0;
    },
    /**
     * 参数为农历日期
     * @method 根据年份判断闰月天数，不闰月返回0
     * @param {int} 年
     * @return {int} 闰月天数
     * **/
    leapMonthLengths: function(y) {
        if (ChineseCalendar.isLeapMonth) {
            return ChineseCalendar.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
        }
        return 0;
    },
    /**
     * 参数为农历日期
     * @method 根据年份判断天干地支年
     * @param {int} 年
     * @return {string} 天干地支
     * **/
    year2GanZhe: function(y) {
        var gan = (y - 3) % 10;
        if (gan === 0) {
            gan = 10;
        }
        var zhe = (y - 3) % 12;
        if (zhe === 0) {
            zhe = 12;
        }
        return ChineseCalendar.Gan[gan - 1] + ChineseCalendar.Zhe[zhe - 1];
    },
    /**
     * 参数均为公历日期
     * @method 根据日期获取星座
     * @param {int} 月份
     * @param {int} 日子
     * @return {string} 星座
     * **/
    getStar: function(month, day) {
        var start = ['魔羯', '水瓶', '双鱼', '白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '魔羯'],
            limit = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22],
            result = (month - 1) + (day > limit[month - 1] ? 1 : 0);
        return start[result] + '座';
    },
    /**
     * 参数为农历日期
     * @method 根据月份获取中文写法
     * @param {int} 月份
     * @return {string} 中文
     * **/
    toLunarMonth: function(m, flag) {
        if (flag) {
            return '闰' + ChineseCalendar.lunarMonStr[m - 1] + '月';
        }
        return ChineseCalendar.lunarMonStr[m - 1] + '月';
    },
    /**
     * 参数为农历日期
     * @method 根据日子获取中文写法
     * @param {int} 日子
     * @return {string} 中文
     * **/
    toLunarDay: function(d) {
        return ChineseCalendar.lunarStr[Math.floor(d / 10)] + (d % 10 === 0 ? '十' : ChineseCalendar.lunarMonStr[d % 10]);
    },
    /**
     * 参数为公历年
     * @method 根据年份获取生肖
     * @param {int} 年
     * @return {string} 生肖
     * **/
    getAnimal: function(y) {
        return ChineseCalendar.Animals[(y - 4) % 12];
    },
    date2lunar: function(date) {
        date = date || new Date();
        var result = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
        var offset = (Date.UTC(result.year, result.month - 1, result.day) - Date.UTC(1900, 0, 30)) / (60 * 60 * 24 * 1000),
            temp = 0;
        for (var i = 1900; i < 2101 && offset >= 0; i++) {
            temp = ChineseCalendar.lunarYearLength(i);
            offset -= temp;
        }
        if (offset < 0) {
            offset += temp;
            i--;
        }
        result.lunarYear = i;

        var isLear = false,
            lunarMonth = ChineseCalendar.leapMonth(result.lunarYear);
        for (var i = 1; i < 13 && offset >= 0; i++) {
            if (i === lunarMonth && !isLear) {
                temp = ChineseCalendar.leapMonthLengths(result.lunarYear);
                offset -= temp;
                isLear = true;
                i--;
            } else {
                temp = ChineseCalendar.lunarMonthLength(result.lunarYear, i);
                offset -= temp;
                isLear = false;
            }
        }
        if (offset < 0) {
            offset += temp;
            i--;
        }
        result.lunarMonth = i;
        result.lunarMonthChiness = ChineseCalendar.toLunarMonth(result.lunarMonth, isLear);

        result.lunarDay = offset;
        result.lunarDayChiness = ChineseCalendar.toLunarDay(result.lunarDay);

        result.animal = ChineseCalendar.getAnimal(result.year);

        result.week = "星期" + ChineseCalendar.weekend[date.getDay()];

        result.start = ChineseCalendar.getStar(result.month, result.day);
        result.gzY = ChineseCalendar.year2GanZhe(result.lunarYear);
        return result;
    }
}