import fs from 'fs';
import path from 'path';

const TASKS_FILE = path.join(process.cwd(), 'src', 'db', 'db.json');

export function readTasks() {
  if (!fs.existsSync(TASKS_FILE)) return [];
  const data = fs.readFileSync(TASKS_FILE, 'utf8');
  return data ? JSON.parse(data) : [];
}

export function writeTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}