
//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
//UNORDERED LIST
const todoList = document.querySelector(".todo-list");
//SELECT
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event) {
    //Prevents Form from Submitting!
    event.preventDefault();

    //Create TODO DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Add todo to LocalStorage
    saveLocalTodos(todoInput.value);

    //Create done BUTTON
    const doneButton = document.createElement("button");
    doneButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>`;
    doneButton.classList.add("done-btn");
    todoDiv.appendChild(doneButton);

    //Create TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    
    //For Empty input value disable Add Button
    if (todoInput.value == "") {
      alert(`This field can't be empty. Please add something`);
      return false;
    } 
    
    // Clear Todo Input Value when new Item is added!
    todoInput.value = "";
    // Appending Above to VAR TodoList
    todoList.appendChild(todoDiv);
  }

  
  function deleteTodo(event) {
    const item = event.target;
    //Delete Todo
    if (item.classList[0] === "trash-btn") {
      const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", e => {
          todo.remove();
        });
      }
    //Check Mark
    if (item.classList[0] === "done-btn") {
      const todo  = item.parentElement;
      todo.classList.toggle("done");
      // console.log(todo);
    }
  }

  function filterTodo(event) {
    const todos = todoList.childNodes;
    // console.log(todos);
    todos.forEach(function(todo) {
      switch (event.target.value) {
        case "all":
        todo.style.display = "flex";
        break;
        case "done":
        if (todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
        case "undone":
        if (!todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      }
    });
  }

  function saveLocalTodos(todo) {
  //Check if we have items present in the local Storage Already.
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach( (todo) => {
        //Create TODO DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //Create done BUTTON
        const doneButton = document.createElement("button");
        doneButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>`;
        doneButton.classList.add("done-btn");
        todoDiv.appendChild(doneButton);

        //Create TRASH BUTTON
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        
        // Appending Above to VAR TodoList
        todoList.appendChild(todoDiv);
      });
}

function removeLocalTodos(todo) {
  //Check if we have items present in the local Storage Already.
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //Saving the root adress of the deleted array element
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

