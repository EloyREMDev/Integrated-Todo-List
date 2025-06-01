import express from 'express';
import { readTasks, writeTasks } from './src/db/db.js';
import path from 'path';

const app = express();
app.use(express.json());

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// Crear una nueva tarea
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Texto requerido' });
  const tasks = readTasks();
  const task = { id: Date.now().toString(), text, completed: false };
  tasks.push(task);
  writeTasks(tasks);
  res.status(201).json(task);
});

// Eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  let tasks = readTasks();
  const prevLength = tasks.length;
  tasks = tasks.filter(t => t.id !== req.params.id);
  if (tasks.length === prevLength) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  writeTasks(tasks);
  res.status(204).end();
});

// Marcar/desmarcar una tarea como completada
app.patch('/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  if (typeof req.body.completed === 'boolean') task.completed = req.body.completed;
  writeTasks(tasks);
  res.json(task);
});

app.use(express.static(path.resolve(process.cwd(), '../Frontend')));

app.listen(3000, (error) => {
  if (error) console.log(error);
  console.log('Server running in http://localhost:3000');
});