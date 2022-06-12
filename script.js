const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
  input.value = "";
});

function addTodo(todo) {
  const todoEl = document.createElement("li");
  let todoText = input.value;

  if (todo) {
    let { text, completed } = todo;
    todoText = text;

    if (completed) todoEl.classList.add("completed");
  }

  todoEl.textContent = todoText;

  todosUL.appendChild(todoEl);

  todoEl.addEventListener("click", (e) => {
    let click = 1;
    crossoutTodo(e);
    click++;

    if (click > 1) {
      deleteTodo(e);
      click = 1;
    }
  });

  todoEl.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    deleteTodo(e);
  });

  updateLS();
}

function crossoutTodo(e) {
  e.target.classList.toggle("completed");
  updateLS();
}

function deleteTodo(e) {
  e.target.remove();
  updateLS();
}

function updateLS() {
  const todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
