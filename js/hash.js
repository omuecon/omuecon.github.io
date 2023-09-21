var group;

function zen2han(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
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

    switch (n % 3) {
        case 0:
            g = "A";
            break;
        case 1:
            g = "B";
            break;
        case 2:
            g = "C";
            break;
        default:
            g = "???";
    }
    return g;
}

function calc_group(s) {
    return mod3(hashCode(s));
}

function show() {
    const course = document.getElementById("course").innerText.trim();
    const gakuseki = document.getElementById("gakuseki").value.trim();
    const str = course + gakuseki;
    group = calc_group(str);
    document.getElementById("group").innerHTML = group;
}

function balancecheck() {
    const course = document.getElementById("course").value.trim();
    const gakuseki_all = document.getElementById("gakuseki").value;
    const gakuseki_arr = gakuseki_all.split("\n");
    var result = [];
    var table = {"A": 0, "B": 0, "C": 0};
    for (i = 0; i < gakuseki_arr.length; i++) {
        var g = calc_group(course + gakuseki_arr[i].trim());
        ++table[g];
        result.push(g);
    }
    document.getElementById("kekka").value = result.join("\n");
    document.getElementById("balanceresult").innerHTML = `A: ${table["A"]}<br>B: ${table["B"]}<br>C: ${table["C"]}`;
}