// --intro overlay--
const welcomeOverlay = document.getElementById("welcome-overlay");
const getStartedBtn = document.getElementById("get-started");

getStartedBtn.addEventListener("click", () => {
  welcomeOverlay.classList.add("hidden");
  console.log("welcome-overlay hidden");

  // wait 1 second for animation to finish before removing from DOM
  setTimeout(() => {
    welcomeOverlay.style.display = "none";
  }, 1000);
});

// --task handling--
const addTaskBtn = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");
const footer = document.getElementById("footer");

addTaskBtn.addEventListener("click", function addTask(event) {
  event.preventDefault();

  const currentTasks = todoList.querySelectorAll(".task-wrapper");
  const taskEntry = document.getElementById("task-entry");
  const taskText = taskEntry.value.trim();

  // stop if task input is empty
  if (taskText === "") {
    console.log("no text input, task not added");
    return;
  }

  // stop if task limit is reached
  if (currentTasks.length >= 8) {
    footer.classList.add("warning");
    return;
  } else {
    footer.classList.remove("warning");
  }

  // create task container
  const taskWrapper = document.createElement("div");
  taskWrapper.classList.add("task-wrapper", "add-task-animation");

  // create task text item
  const taskLi = document.createElement("li");
  taskLi.classList.add("task-li");
  taskLi.textContent = taskText;
  taskLi.title = taskText;

  // create remove button
  const xButton = document.createElement("button");
  xButton.classList.add("task-button");
  xButton.textContent = "+";

  // remove task event
  xButton.addEventListener("click", function (event) {
    event.preventDefault();

    taskWrapper.classList.add("removing");

    setTimeout(() => {
      taskWrapper.remove();

      // re-check task count and hide footer warning if under 8
      const updatedTasks = todoList.querySelectorAll(".task-wrapper");
      if (updatedTasks.length < 8) {
        footer.classList.remove("warning");
      }
    }, 300);

    console.log("task removed: " + taskText);
  });

  // build task
  taskWrapper.appendChild(taskLi);
  taskWrapper.appendChild(xButton);
  todoList.appendChild(taskWrapper);

  taskEntry.value = "";

  console.log("task added: " + taskText);
});
