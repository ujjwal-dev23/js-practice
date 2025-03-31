let input = document.getElementById("todo-input");
let addBtn = document.getElementById("add-task-btn");
let todoList = document.getElementById("todo-list");

let itemsList = [];

addBtn.addEventListener('click', function() {
    let inputText = input.value.trim();
    if (inputText === "") return;
    itemsList.push(
        {
            id: Date.now(),
            value: inputText,
            completed: false,
        }
    );
    input.value = "";
});
