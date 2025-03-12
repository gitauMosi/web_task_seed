// imports
const API_URL = "http://localhost:5000/api";

// ========== Auth ===========

// Logout User 
function logout() {
  localStorage.removeItem("token");
  alert("Logged out!");
  document.getElementById("todoList").innerHTML = "";
  window.location.href = "/login";
}

// ============== popup dialog ================

const openPopupBtn = document.getElementById('openPopupBtn');
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('closePopupBtn');
const submitBtn = document.getElementById('submitBtn');
const todoTitle = document.getElementById("todoTitle");
const todoContent = document.getElementById("todoContent");

openPopupBtn.addEventListener('click', () => {
  popup.style.display = 'flex';
});

closePopupBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Handles form submission
submitBtn.addEventListener('click', () => {
  const title = todoTitle.value.trim();
  const content = todoContent.value.trim();

  if (title && content) {
    createTodo(title, content);  
    popup.style.display = 'none';
  } else {
    alert('Please fill in both fields!');
  }
});

// ============ Task API logic ================

// +++++++ Initial load ++++++++

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must log in first!");
    window.location.href = "/login";
  } else {
    loadTodos();
  }
});

async function loadTodos() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/todos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  const todos = await res.json();

  if (res.ok) {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';  

    todos.forEach((todo, index) => {
      const listTile = document.createElement("div");
      listTile.classList.add("list-tile");

      listTile.innerHTML = `
        <div class="row">
            <div class="leading">
                ${index + 1}.
            </div>
            <div class="col">
                <div>${todo.title}</div>
                <div>${todo.content}</div>
            </div>
        </div>

        <div class="trailing row">
        <div class="edit-btn" onclick="updateTodo(${todo.id})">🖍</div>
            <div class="delete-btn" onclick="deleteTodo(${todo.id})">❌</div>
            <label class="custom-checkbox">
                <input type="checkbox" id="checkbox" value="isDone" onclick="updateIsDone(${todo.id})" ${todo.isDone ? "checked" : ""}>
                <span class="checkmark"></span>
            </label>
        </div>
      `;
      taskList.appendChild(listTile);
    });
  } else {
    alert("Failed to load todos!");
    window.location.href = "/login";
  }
}

// ============ CRUD API functions ================

//  +++++++++ Create Task +++++++++++

async function createTodo(title, content) {
  const token = localStorage.getItem("token");
  if (!token) return alert("Please log in first.");

  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ title, content }),
  });

  if (res.ok) {
    alert("To-Do added!");
    loadTodos();  
  } else {
    alert("Failed to add To-Do.");
  }
}

// +++++++++ Update Task Status ++++++++

 async function updateIsDone(id) {
  const token = localStorage.getItem("token");
  if (!token) return alert("Please log in first.");

  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ isDone: true }),
  });

  if (res.ok) {
    alert("To-Do updated!");
    loadTodos(); 
  } else {
    alert("Failed to update To-Do.");
  }
  
 }

// +++++++++ Update Task ++++++++
async function updateTodo(id) {
  const token = localStorage.getItem("token");
  if (!token) return alert("Please log in first.");

  const newTitle = prompt("Enter new title:");
  const newContent = prompt("Enter new content:");

  if (!newTitle || !newContent) return;

  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ title: newTitle, content: newContent }),
  });

  if (res.ok) {
    alert("To-Do updated!");
    loadTodos(); 
  } else {
    alert("Failed to update To-Do.");
  }
}

// +++++++++++ Delete Task +++++++++++

async function deleteTodo(id) {
  const token = localStorage.getItem("token");
  if (!token) return alert("Please log in first.");

  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` },
  });

  if (res.ok) {
    loadTodos();  
  } else {
    alert("Failed to delete To-Do.");
  }
}
