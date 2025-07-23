const TASKS_KEY_NAME = "tasks";

function addTask(event) {
  event.preventDefault(); // prevent form submission
  const data = collectDataFromForm();
  const tasksJSON = localStorage.getItem(TASKS_KEY_NAME);
  const taskId = tasksJSON ? JSON.parse(tasksJSON).length : 0;
  const newTR = generateTR(data, taskId);
  injectTRToDOM(newTR);
  saveTaskToLocalStorage(data);
  resetForm();
}
function resetForm() {
  document.getElementById("todo-input").value = ` `;
  document.getElementById("date-applied").value = ` `;
  document.getElementById("time-appliedHours").value = ` `;
  document.getElementById("time-appliedMinutes").value = ` `;


}

function collectDataFromForm() {
  const input = document.getElementById("todo-input").value;
  const dateApplied = document.getElementById("date-applied").value;
  const timeAppliedHours = document.getElementById("time-appliedHours").value;
  const timeAppliedMinutes = document.getElementById("time-appliedMinutes").value;

  return {
    input,
    dateApplied,
    timeAppliedHours,
    timeAppliedMinutes,
  };
}

//Can do time function which converts am/pm to 24hr
function generateTR(data, id) {
  // deconstruction
  const { input, timeAppliedHours, dateApplied, timeAppliedMinutes } = data;

  const newTR = `
        <div class="scrollBox">
          <table class="theme-table">
            <tr>
              <td><div class="text-area">${input}</div><td>
              <td><button class="del-button" onclick="deleteTask(${id})">x</button></td>
            </tr>
            <tr>
              
            <tr>
              <td><div class="date-area">${dateApplied}</div></td>
            </tr>
            <td><div class="time-area">${timeAppliedHours}:${timeAppliedMinutes}</div></td>
            </tr>
          </div>
          </table>
    `;
  return newTR;
}

function injectTRToDOM(newTR) {
  const tasks = document.getElementById(`task-list`);
  const container = document.createElement(`div`);
  container.innerHTML += newTR;
  tasks.appendChild(container);
}

function loadTasksFromStorage() {
  document.getElementById("task-list").innerHTML = "";
  const tasksJSON = localStorage.getItem(TASKS_KEY_NAME);
  if (tasksJSON) {
    const tasks = JSON.parse(tasksJSON);
    let i = 0;
    for (const task of tasks) {
      const newTR = generateTR(task, i);
      i++;
      injectTRToDOM(newTR);
    }
  }
}

function saveTaskToLocalStorage(task) {
  const tasksJSON = localStorage.getItem(TASKS_KEY_NAME) || "[]";
  const tasks = JSON.parse(tasksJSON);
  tasks.push(task);
  localStorage.setItem(TASKS_KEY_NAME, JSON.stringify(tasks));
}


function deleteTask(id) {
  const tasksJSON = localStorage.getItem(TASKS_KEY_NAME);
  const tasks = JSON.parse(tasksJSON);
  tasks.splice(id, 1);
  localStorage.setItem(TASKS_KEY_NAME, JSON.stringify(tasks));
  loadTasksFromStorage();
}
loadTasksFromStorage();
