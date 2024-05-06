const app = document.querySelector("#app");
app.style.display = "flex";

function splitItem(item) {
    const code = /\[(?<date>\d*-\d*-\d*)T(?<time>\d*:\d+:\d+)\+\d+\] \[ALPM\] (?<status>\w+) (?<app_name>.+) .+/g
    return code.exec(item)?.groups || { date: null, time: null, app_name: null }
}

function createList(data, header) {
    const div = document.createElement("div");
    div.style.width = "50%";

    const title = document.createElement("h3");
    title.textContent = header
    div.appendChild(title);

    const ul = document.createElement("ul");
    div.appendChild(ul);

    data.map(item => {
        const { date, time, status, app_name } = splitItem(item);
        const li = document.createElement("li");
        li.textContent = app_name != null ? `App name: ${app_name} Date: ${date} Time: ${time} Status: ${status}` : item;
        ul.appendChild(li);
    })

    app.appendChild(div);
}

function readFile(path) {
    return fetch(path)
        .then(response => response.text())
        .then(data => {
            return data.split("\n");
        })
        .catch(err => {
            console.log("Some error occured: ", err);
            return null;
        })
}

createList(await readFile("../installed_apps_list.txt"), "Installed Apps");
createList(await readFile("../removed_apps_list.txt"), "Removed Apps");