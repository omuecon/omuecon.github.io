function displayCourse(json) {
    document.title = json.course_title;
    document.getElementById("title").innerText = json.course_title;
    document.getElementById("course").innerText = json.course_code;
}

function displaySchedule(json) {
    let schedule = document.querySelector("#schedule tbody");
    const grps = ["A", "B", "C"];

    /// ここを書き換えてテーブルを作る
    for (let i = 0; i < json.dates.length; i++) {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.textContent = json.dates[i];
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.textContent = grps[i % 3];
        tr.appendChild(td2);
        
        schedule.appendChild(tr);
    }
}