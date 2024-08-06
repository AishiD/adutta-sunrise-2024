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
  { id: 2, title: 'Basic Introduction', description: 'Complete the introductory module', status: 'In Progress' },
  { id: 3, title: 'Basic Git', description: 'Learn basic Git commands', status: 'To-Do' },
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
