// Get elements from DOM
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// create or take task array from localstorage
const tasks = getTasks();
// create id variable to keep track of ids of tasks
let idCounter = 1;
// display tasks array in case of there is task array in localstorage
displayTasks();


// This function returns local storage tasks array if there is not, returns empty array
function getTasks() {
  const tasksJson = localStorage.getItem('tasks');
  if(!tasksJson)
    return [];
  return JSON.parse(tasksJson);
}

// This function gets tasks array and save it to localstorage
function saveToLocalStorage(tasks) {
  const tasksJson = JSON.stringify(tasks);
  console.log(tasksJson);
  localStorage.setItem('tasks', tasksJson);
}

// This class declaration is for defining Tasks with properies and changeStatus method.
class Task {
  constructor(text){
    this.id = idCounter;
    this.text = text;
    this.isCompleted = false;
    idCounter++;
  }

  changeStatus() {
    this.isCompleted = !(this.isCompleted);
  }
}

// This event listener listen for add button
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
// Get task from input field
  const taskText = todoInput.value.trim();
// Create task object and push to tasks array
  tasks.push(new Task(taskText));
  saveToLocalStorage(tasks);
// After adding a new Task we should render the task array again
  displayTasks();
  todoInput.value = '';
})

// This function for rendering every task in the tasks array by creating html structure for each
function displayTasks() {
todoList.innerHTML = '';
// Create <li> element for every object in tasks array
tasks.map((task) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    // if completed: add completed class to the li element
    if(task.isCompleted)
      li.classList.add('completed');

    li.innerHTML = `
                    ${task.text}<div class="todo-buttons">
                      <button class="complete-btn">
                        <i class="fa-solid fa-check"></i>
                      </button>
                      <button class="delete-btn">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                    `;
    // add li element to todo list element
    todoList.append(li);

    // Add even listener for the complete button and delete button
    const completeBtn = li.querySelector('.complete-btn');
    completeBtn.addEventListener('click', function() {
      // Toggle the completed state of the task
      task.isCompleted = !task.isCompleted;
      saveToLocalStorage(tasks);

      // Update the UI by re-rendering the tasks
      displayTasks();
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      // Delete from index of the current task to 1 item
      tasks.splice(tasks.indexOf(task), 1);
      saveToLocalStorage(tasks);

      // Update the UI by re-rendering the tasks
      displayTasks();
    });
  })
}
