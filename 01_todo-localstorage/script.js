document.addEventListener('DOMContentLoaded', () => {
  let input = document.getElementById("todo-input");
  let addBtn = document.getElementById("add-task-btn");
  let todoList = document.getElementById("todo-list");

  let itemsList = JSON.parse(localStorage.getItem('tasks')) || [];

  itemsList.forEach((task) => renderTask(task));

  function addNewItem() {
    let inputText = input.value.trim();
    if (inputText === "") return;
    const task = 
      {
        id: Date.now(),
        value: inputText,
        completed: false,
      }
    itemsList.push(task);
    input.value = "";
    saveTasks();
    renderTask(task);
  }

  addBtn.addEventListener('click', function() {
    addNewItem();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addNewItem();
  })

  function renderTask(task) {
    const taskItem = document.createElement('li')
    taskItem.setAttribute('data-id', task.id);
    taskItem.innerHTML = `
    <span>${task.value}</span>
    <button> Delete </button>
    `;

    if (task.completed) {
      taskItem.classList.add("completed")
    }

    taskItem.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      taskItem.classList.toggle("completed");
      saveTasks();
    });

    taskItem.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      itemsList = itemsList.filter((t) => t.id !== task.id) 
      taskItem.remove();
      saveTasks();
    })

    todoList.appendChild(taskItem);  
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(itemsList));
  }
});
