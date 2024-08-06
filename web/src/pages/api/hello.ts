// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'To-Do' | 'In Progress' | 'Completed';
}

let tasks: Task[] = [
  { id: 1, title: 'Initial Setup', description: 'Set up the development environment', status: 'Completed' },
{ id: 2, title: 'Basic Introduction', description: 'Complete the introductory module', status: 'To-Do' },
{ id: 3, title: 'Basic Git', description: 'Learn basic Git commands', status: 'To-Do' },
{ id: 4, title: 'Git Collaboration', description: 'Collaborate on a Git repository', status: 'To-Do' },
{ id: 5, title: 'JavaScript Basics', description: 'Complete JavaScript basics tutorial', status: 'To-Do' },
{ id: 6, title: 'JavaScript Project', description: 'Create a small JavaScript project', status: 'To-Do' },
{ id: 7, title: 'API Introduction', description: 'Learn about RESTful APIs', status: 'In Progress' },
{ id: 8, title: 'API Consumption', description: 'Consume an API in a project', status: 'To-Do' },
{ id: 9, title: 'Final Project', description: 'Complete the final project', status: 'To-Do' },
{ id: 10, title: 'Project Presentation', description: 'Present the final project', status: 'To-Do' }

];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      res.status(200).json(tasks);
      break;
    }
    case 'POST': {
      const newTask: Task = req.body;
      tasks.push(newTask);
      res.status(201).json(newTask);
      break;
    }
    case 'PUT': {
      const updatedTask: Task = req.body;
      tasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
      res.status(200).json(updatedTask);
      break;
    }
    case 'DELETE': {
      const { id } = req.query;
      tasks = tasks.filter(task => task.id !== Number(id));
      res.status(204).end();
      break;
    }
    default: {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}
