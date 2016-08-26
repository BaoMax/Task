(function() {
    function splitStr(reg, str) {
        return str.split(reg);
    }

    function trimList(list) {
        each(list, function(item, index) {
            list[index] = trim(item);
        });
        return list;
    }

    function render(ele, textList, tag, type) {
        var str = "";
        tag = tag || "li";
        type = type || "";
        ele.innerHTML = "";
        each(textList, function(item, index) {
            str += "<" + tag + " type = '" + type + "'>" + item + "</" + tag + ">";
        });
        ele.innerHTML = str;
    }
    $.click("#submit1", function() {
        var hobbyList = splitStr(/,/g, $("#hobby1").value);
        hobbyList = trimList(hobbyList);
        hobbyList = uniqArray(hobbyList);
        render($("#result1"), hobbyList);
    });

    $.click("#submit2", function() {
        var hobbyList = splitStr(/[, ;、，　\n]/, $("#hobby2").value);
        hobbyList = trimList(hobbyList);
        hobbyList = uniqArray(hobbyList);
        render($("#result2"), hobbyList);
    });

    $.click("#submit3", function() {
        var hobbyList = splitStr(/[, ;、，　\n]/, $("#hobby3").value);
        hobbyList = trimList(hobbyList);
        hobbyList = uniqArray(hobbyList);
        render($("#result3"), hobbyList, "input", "checkbox");
    });
    $.on("#hobby3", "keyup", function() {
        var value = $("#hobby3").value,
            tip = $("#tip"),
            list = null;
        if (value == "") {
            tip.innerHTML = "不能为空！";
            return;
        }
        list = splitStr(/[, ;、，　\n]/, value);
        if (list.length > 10) {
            tip.innerHTML = "不能超过10个！";
            return;
        }
        tip.innerHTML = "";
    });

})();