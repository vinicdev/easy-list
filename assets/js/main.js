var btnAddTask = document.getElementById("buttonAddTask");
var inputTask = document.getElementById("taskInput");
var containerResult = document.getElementById("result");
var listResult = document.getElementById("resultList");
var list = [];

document.addEventListener("DOMContentLoaded", function () {
  var storedList = localStorage.getItem("taskList");

  if (storedList) {
    list = JSON.parse(storedList);
    printItem();
  }

  inputTask.addEventListener("input", function () {
    btnAddTask.disabled = inputTask.value === "";
    updateButtonStyle();
  });

  btnAddTask.addEventListener("click", addNewTask);

  inputTask.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      addNewTask();
    }
  });

  btnAddTask.disabled = true;
  updateButtonStyle();
});

function addNewTask() {
  if (inputTask.value.trim() !== "") {
    list.push({ description: inputTask.value, crossed: false });
    saveListToLocalStorage();
    resetInput();
    printItem();
  }
}

function resetInput() {
  inputTask.value = "";
  btnAddTask.disabled = true;
  updateButtonStyle();
}

function printItem() {
  containerResult.style.display = "block";

  if (listResult) {
    listResult.innerHTML = "";

    list.forEach((item, index) => {
      const liElemento = document.createElement("li");

      const taskWrapper = document.createElement("div");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = item.crossed;
      checkbox.addEventListener("change", function () {
        toggleCrossed(index);
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        deleteTask(index);
      });

      const taskDescription = document.createElement("span");
      taskDescription.textContent = item.description;
      if (item.crossed) {
        taskDescription.style.textDecoration = "line-through";
        taskDescription.style.opacity = ".3";
      }

      taskWrapper.appendChild(checkbox);
      taskWrapper.appendChild(deleteButton);

      liElemento.appendChild(taskDescription);
      liElemento.appendChild(taskWrapper);

      listResult.appendChild(liElemento);
    });
  } else {
    console.error("Elemento ul não encontrado no HTML.");
  }
}

function toggleCrossed(index) {
  list[index].crossed = !list[index].crossed;
  saveListToLocalStorage();
  printItem();
}

function deleteTask(index) {
  list.splice(index, 1);
  saveListToLocalStorage();
  printItem();
}

function saveListToLocalStorage() {
  localStorage.setItem("taskList", JSON.stringify(list));
}

window.addEventListener("storage", function (event) {
  if (event.key === "taskList") {
    var storedList = localStorage.getItem("taskList");
    list = JSON.parse(storedList);
    printItem();
  }
});

function updateButtonStyle() {
  if (btnAddTask.disabled) {
    btnAddTask.classList.add("disabled-button");
  } else {
    btnAddTask.classList.remove("disabled-button");
  }
}
