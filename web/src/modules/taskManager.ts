
import Task from "../model/Task";
import { initialTasks } from "../utils/TaskList";

// Initializing tasks with some predefined tasks
let tasks: Task[] = [...initialTasks];

// Function to initialize tasks (if needed)
export function initializeTasks() {
  tasks = [...initialTasks];
}

// Function to get active (incomplete) tasks
export function getActiveTasks(): Task[] {
  return tasks.filter(task => !task.completed);
}

// Function to get completed tasks
export function getCompletedTasks(): Task[] {
  return tasks.filter(task => task.completed);
}

// Function to get all tasks
export function getAllTasks(): Task[] {
  return tasks;
}

// Function to complete a task given its title
export function completeTask(taskTitle: string): void {
  tasks = tasks.map(task =>
    task.title === taskTitle ? { ...task, completed: true } : task
  );
}

// Function to create a new task
export function createTask(title: string, description: string, persona: string, group: number): void {
  const newTask: Task = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1, // Auto-increment ID
    title,
    description,
    persona,
    group,
    completed: false,
  };
  tasks.push(newTask);
}

// Function to update an existing task by its ID
export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, ...updatedTask } : task
  );
}

// Function to delete a task by its ID
export function deleteTask(taskId: number): void {
  tasks = tasks.filter(task => task.id !== taskId);
}
