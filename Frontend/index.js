// Selectores
const form = document.getElementById('form');
const taskInput = document.getElementById('form-input-task');
const taskList = document.getElementById('task-list');
const errorMessage = document.getElementById('form-error-text');
const taskTotal = document.getElementById('task-total');
const taskComplete = document.getElementById('task-complete');
const taskIncomplete = document.getElementById('task-incomplete');

// Lista de tareas (ahora viene del backend)
let tasks = [];

// URL del backend
const API_URL = 'http://localhost:3000/tasks';

// Función para renderizar las tareas
function renderTasks() {
  // Limpiar la lista actual
  taskList.innerHTML = '';

  // Agregar cada tarea
  tasks.forEach((task, index) => {
    // Crear el elemento de la tarea
    const taskItem = document.createElement('li');
    taskItem.classList.add(task.completed ? 'task-item-completed' : 'task-item');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('task-delete-btn');
    deleteButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 1 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" />
      </svg>`;
    deleteButton.addEventListener('click', () => deleteTask(index));

    const taskText = document.createElement('p');
    taskText.classList.add(task.completed ? 'task-text-completed' : 'task-text');
    taskText.textContent = task.text;

    const checkButton = document.createElement('button');
    checkButton.classList.add('task-check-btn');
    checkButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clip-rule="evenodd" />
      </svg>`;
    checkButton.addEventListener('click', () => toggleTaskCompletion(index));

    // Añadir los elementos al <li>
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(taskText);
    taskItem.appendChild(checkButton);

    // Añadir el <li> al <ul>
    taskList.appendChild(taskItem);
  });

  // Actualizar los contadores
  updateCounters();
}

// Obtener todas las tareas del backend
async function fetchTasks() {
  try {
    const resp = await fetch(API_URL);
    tasks = await resp.json();
    renderTasks();
  } catch (error) {
    showErrorMessage('Error al conectar con el servidor');
  }
}

// Agregar nueva tarea al backend
async function addTask(taskText) {
  if (taskText.trim() === '') {
    showErrorMessage('No puede estar vacío');
    return;
  }
  try {
    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: taskText })
    });
    if (!resp.ok) {
      const err = await resp.json();
      showErrorMessage(err.error || 'Error al agregar tarea');
      return;
    }
    const nueva = await resp.json();
    tasks.push(nueva);
    renderTasks();
    clearInput();
  } catch (error) {
    showErrorMessage('Error al conectar con el servidor');
  }
}

// Eliminar tarea en el backend
async function deleteTask(index) {
  const task = tasks[index];
  try {
    const resp = await fetch(`${API_URL}/${task.id}`, {
      method: 'DELETE'
    });
    if (!resp.ok && resp.status !== 204) {
      showErrorMessage('Error al eliminar tarea');
      return;
    }
    tasks.splice(index, 1);
    renderTasks();
  } catch (error) {
    showErrorMessage('Error al conectar con el servidor');
  }
}

// Marcar/desmarcar tarea como completada en el backend
async function toggleTaskCompletion(index) {
  const task = tasks[index];
  try {
    const resp = await fetch(`${API_URL}/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed })
    });
    if (!resp.ok) {
      showErrorMessage('Error al actualizar tarea');
      return;
    }
    tasks[index] = await resp.json();
    renderTasks();
  } catch (error) {
    showErrorMessage('Error al conectar con el servidor');
  }
}


// Función para actualizar los contadores
function updateCounters() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const incompleteTasks = totalTasks - completedTasks;

  taskTotal.textContent = `Total: ${totalTasks}`;
  taskComplete.textContent = `Completadas: ${completedTasks}`;
  taskIncomplete.textContent = `Incompletas: ${incompleteTasks}`;
}

// Función para mostrar un mensaje de error en el input
function showErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}

// Función para limpiar el mensaje de error y el campo de entrada
function clearInput() {
  taskInput.value = '';
  errorMessage.style.display = 'none';
}

// Manejar el evento de envío del formulario
form.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(taskInput.value);
});

// Renderizar las tareas al cargar la página (trae del backend)
document.addEventListener('DOMContentLoaded', fetchTasks);