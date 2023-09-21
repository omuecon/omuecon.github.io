function displayCourse(json) {
    document.title = json.course_title;
    let course_title = document.getElementById("course");
    course_title.innerText = json.course_title;
    course_title.dataset.course_code = json.course_code;
    course_title.dataset.course_adjustment = json.adjustment;

    document.getElementById("code").innerText = json.course_code;
    document.getElementById("room_remote").innerText = json.remote;
    document.getElementById("room_inperson").innerText = json.inperson;
    room_remote
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

        let td3 = document.createElement("td");
        td3.textContent = grps[(i + 1) % 3] + " + " + grps[(i + 2) % 3];
        tr.appendChild(td3);
        
        schedule.appendChild(tr);
    }
}