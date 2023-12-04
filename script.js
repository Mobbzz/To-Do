const todoList = document.getElementById("todoList");
const submitBtn = document.querySelector("#addtodo");
const todoInput = document.querySelector("#todoInput");
const clearText = document.querySelector('.todoInput');
const errorMessage = document.querySelector("#errorMessage");
let toDoArray = [];
let BASE_URL = "https://js1-todo-api.vercel.app/api/todos?apikey=05eb7c55-040c-441a-8b65-6f08055ed54f";

// Fetch to get todos
window.onload = function() {
  fetch(BASE_URL)
    .then(response => response.json())
    .then(todos => {
      toDoArray = todos;
      updateDOMList();
    });
}

function updateDOMList() {
  todoList.innerHTML = '';
  toDoArray.forEach(todo => {
    let listItem = document.createElement("li");
    let textSpan = document.createElement("span");
    textSpan.innerText = todo.title;
    textSpan.addEventListener('click', function() {
      this.classList.toggle('completed');
    });

    listItem.appendChild(textSpan);
    listItem.setAttribute("data-id", todo._id);
    listItem.innerHTML += ' <button onclick="removeTodo(this)">Remove</button>';
    todoList.appendChild(listItem);
  });
}

// Remove todo
function removeTodo(element) {
  let listItem = element.parentNode;
  let id = listItem.getAttribute("data-id");
console.log(id);

  // Remove the list item from the DOM
  listItem.parentNode.removeChild(listItem);

  // Remove the todo from the array
  toDoArray = toDoArray.filter(todo => todo.id !== id);

  // Make a DELETE request to the API
  fetch(`https://js1-todo-api.vercel.app/api/todos/${id}?apikey=05eb7c55-040c-441a-8b65-6f08055ed54f`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => console.log(data));
}

  // Validation no empty todo
  function addTodo(e) {
    e.preventDefault()
    const todoInput = document.getElementById("todoInput").value;
    if (todoInput.trim() === "") {
      errorMessage.classList.remove('d-none');
      return 
    }
    errorMessage.classList.add('d-none');
  // Send to API
      const newTodo = {
        userId: 11,
        title: todoInput,
        completed: false,
    }
  // Add to the list
    let listItem = document.createElement("li");
    listItem.innerText = todoInput;
    listItem.innerHTML += ' <button onclick="removeTodo(this)">Remove</button>';
// The function to build the todo list
function buildTodoList() {
  for (let i = 0; i < toDoArray.length; i++) {
    let todo = toDoArray[i];
    let listItem = document.createElement("li");
    listItem.innerText = todo.title;
    listItem.setAttribute("data-id", todo.id);
    listItem.innerHTML += ' <button onclick="removeTodo(this)">Remove</button>';

    // If the todo is completed, add the 'completed' class
    if (todo.completed) {
      listItem.classList.add('completed');
    }

    // Add click event to mark todo as done
listItem.addEventListener('click', function(e) {
  if (e.target !== li) {
    return;
  }
  this.classList.toggle('completed');
  todo.completed = !todo.completed;
  // Save the updated todos in localStorage
  localStorage.setItem('todos', JSON.stringify(toDoArray));
});

    todoList.appendChild(listItem);
  }
}

todoList.appendChild(listItem);

    todoList.appendChild(listItem);
  fetch('https://js1-todo-api.vercel.app/api/todos?apikey=05eb7c55-040c-441a-8b65-6f08055ed54f', {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => {
    toDoArray.push(json)
    console.log(toDoArray)
    console.log(json)
    console.log("clear text")
    clearText.value = "";
  })
}
  submitBtn.addEventListener('click', addTodo)