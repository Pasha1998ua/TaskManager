const reserveBoardArr = [{
    "id": "1",
    "catName": "ToDo",
    "tasks": [{
        "id": "1",
        "title": "Task",
        "description": "Task description Task description Task description Task description"
    }, {
        "id": "2",
        "title": "Task",
        "description": "Task description Task description Task description Task description"
    }, {
        "id": "3",
        "title": "Task",
        "description": "Task description Task description Task description Task description"
    }]
}, {
    "id": "2",
    "catName": "Do",
    "tasks": [{
        "id": "1",
        "title": "Task",
        "description": "Task description Task description Task description Task description"
    }, {
        "id": "2",
        "title": "Task",
        "description": "Task description Task description Task description Task description"
    }]
}, {
    "id": "3",
    "catName": "Done",
    "tasks": [{
        "id": "1",
        "title": "Task",
        "description": "Task description Task description Task description Task description"
    }, {
        "id": "2",
        "title": "Task",
        "description": "Task description Task description Task description Task description"
    }]
}];

var boardArr = getDataFromLocalStorage();

function saveDataToLocalStorage(){
    localStorage.setItem("data", JSON.stringify(boardArr));
}

function getDataFromLocalStorage(){
    return JSON.parse(localStorage.getItem("data"));
}

function addTask(catName, title, description) {
    for (const cat of boardArr) {
        if (cat.catName === catName) {
            cat.tasks.push({ "id": idSelector(cat.tasks), "title": title, "description": description });
            renderBoard();
        }
    }
}

function remTask(catId, taskId) {
    for (const cat of boardArr) {
        if(cat.id === catId){
            cat.tasks = cat.tasks.filter((_) => _.id !== taskId);
            renderBoard();
        }
    }
}

function moveTask(taskId, catFromId, catToId) {
    for (const cat of boardArr) {
        if(cat.id === catFromId){
            for (const task of cat.tasks) {
                if(task.id === taskId){
                    let catName = getCatNameById(catToId);
                    if(catName !== undefined){
                        addTask(catName, task.title, task.description);
                        cat.tasks = cat.tasks.filter((_) => _.id !== taskId);
                        renderBoard();
                    }
                }
            }
        }
    }
}

function getCatNameById(id){
    for (const cat of boardArr) {
        if(cat.id === id){
            return cat.catName;
        }
    }
}

function isExistCatName(name) {
    for (const cat of boardArr) {
        if(cat.catName === name){
            return true;
        }
    }
    return false;
}

function idSelector(arr) {
    for (let i = 1; i < 1000; i++) {
        let flag = false;
        for (const elem of arr) {
            if (elem.id == i) {
                flag = true;
            }
        }
        if (!flag) {
            return i.toString();
        }
    }
}

var board = document.getElementById("taskBoard");

function renderBoard() {
    saveDataToLocalStorage();
    board.innerHTML = "";
    for (let i = 0; i < boardArr.length; i++) {
        let cat = createCat(boardArr[i].id, boardArr[i].catName);
        for (let j = 0; j < boardArr[i].tasks.length; j++) {
            cat.appendChild(createTask(boardArr[i].tasks[j].id, boardArr[i].tasks[j].title, boardArr[i].tasks[j].description));
        }
        board.appendChild(cat);
    }
}

function createCat(id,name) {
    let cat = document.createElement("div");
    cat.appendChild(createNode("h3", name, []));
    let addBtn = createNode("span", "+", ["addTask"]);
    addBtn.setAttribute("onclick", 'toogleModal("taskInputModal")');
    cat.appendChild(addBtn);
    cat.dataset.id = id;
    cat.classList.add("column");
    return cat;
}

function createTask(id,title, description) {
    let task = document.createElement("div");
    task.classList.add("card");
    let delBtn = createNode("span", "x", ["delTask"]);
    delBtn.setAttribute("onclick", 'remTask(this.parentNode.parentNode.dataset.id, this.parentNode.dataset.id)');
    task.appendChild(delBtn);
    let moveBtn = createNode("span", ">", ["moveTask"]);
    moveBtn.setAttribute("onclick", 'moveTask(this.parentNode.dataset.id, this.parentNode.parentNode.dataset.id, (parseInt(this.parentNode.parentNode.dataset.id) + 1).toString())');
    task.appendChild(moveBtn);
    task.appendChild(createNode("h4", title, []));
    task.appendChild(createNode("span", null, ["hrLine"]));
    task.appendChild(createNode("p", description, []));
    task.dataset.id = id;
    return task;
}

function createNode(tag, text, classes) {
    let node = document.createElement(tag);
    if (text !== null) {
        node.innerText = text;
    }
    for (const singleClass of classes) {
        node.classList.add(singleClass);
    }
    return node;
}

function formTaskInput() {
    let flag = true;
    let catName = document.getElementById("catName").value;
    if (catName === "") { document.getElementById("catName").classList.add("inputError"); flag = false;}
    if (!isExistCatName(catName)) {document.getElementById("catName").classList.add("inputError"); flag = false;}
    let taskTitle = document.getElementById("taskTitle").value;
    if (taskTitle === "") { document.getElementById("taskTitle").classList.add("inputError"); flag = false;}
    let taskDescr = document.getElementById("taskDescr").value;
    if (taskDescr === "") { document.getElementById("taskDescr").classList.add("inputError"); flag = false;}
    if(flag){
        addTask(catName, taskTitle, taskDescr);
        toogleModal('taskInputModal');
    }
}

renderBoard();