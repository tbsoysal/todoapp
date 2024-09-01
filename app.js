const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

const tasks = getTasks();
let idCounter = 1;
displayTasks();

function getTasks() {
  const tasksJson = localStorage.getItem('tasks');
  if(!tasksJson)
    return [];
  return JSON.parse(tasksJson);
}

function saveToLocalStorage(tasks) {
  const tasksJson = JSON.stringify(tasks);
  console.log(tasksJson);
  localStorage.setItem('tasks', tasksJson);
}

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

// Listen for submit
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
// Get task from input field
  const taskText = todoInput.value.trim();
// Create task object and push to tasks array
  tasks.push(new Task(taskText));
  saveToLocalStorage(tasks);
  displayTasks();
  todoInput.value = '';
})

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
