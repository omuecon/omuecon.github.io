function zen2han(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}

function correct_empty_string(str) {
    if (str == null ||
        str == undefined ||
        str.length == 0) {
        return "";
    } else {
        return str.trim();
    }
}

function hashCode(str) {
    var hash = 0,
        i, chr;
    str = zen2han(str);
    var str_lower = str.toLowerCase();
    if (str_lower.length === 0) return -1;
    for (i = 0; i < str_lower.length; i++) {
        chr = str_lower.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    if (hash < 0) {
        hash = -hash;
    }
    return hash;
}

function mod3(n) {
    let groups = ["A", "B", "C"];
    return groups[n % 3];
}

function calc_group(s) {
    return mod3(hashCode(s));
}

function show() {
    const course = document.getElementById("course");
    const course_code = course.dataset.course_code;
    const adjustment = correct_empty_string(course.dataset.course_adjustment);
    const gakuseki = document.getElementById("gakuseki").value.trim();
    const str = course_code + adjustment + gakuseki;
    const grps = ["A", "B", "C"];

    group = calc_group(str);
    document.getElementById("group").innerHTML = group;

    let trs = document.querySelectorAll("#schedule tbody tr");
    for (let i = 0; i < trs.length; i++) {
        if (grps[i % 3] == group) {
            trs[i].classList.add("my-group");
        } else {
            trs[i].classList.remove("my-group");
        }
    }
}

function balancecheck() {
    const course = document.getElementById("course").value.trim();
    const adjustment = correct_empty_string(document.getElementById("adjustment").value);
    const gakuseki_all = document.getElementById("gakuseki").value;
    const gakuseki_arr = gakuseki_all.split("\n");
    var result = [];
    var table = { "A": 0, "B": 0, "C": 0 };
    for (i = 0; i < gakuseki_arr.length; i++) {
        var g = calc_group(course + adjustment + gakuseki_arr[i].trim());
        ++table[g];
        result.push(g);
    }
    document.getElementById("kekka").value = result.join("\n");
    plotHist(table);
}

function plotHist(table) {
    var yValue = ["C", "B", "A"];
    var xValue = [table.C, table.B, table.A];

    var trace1 = {
        x: xValue,
        y: yValue,
        type: 'bar',
        text: xValue.map(String),
        textposition: 'auto',
        hoverinfo: 'none',
        orientation: 'h',
        marker: {
            color: 'rgb(158,202,225)',
            opacity: 0.6,
            line: {
                color: 'rgb(8,48,107)',
                width: 1.5
            }
        }
    };

    var data = [trace1];

    var layout = {
        title: 'Balance',
        barmode: 'stack'
    };

    Plotly.newPlot('myDiv', data, layout);
}