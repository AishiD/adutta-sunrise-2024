import { NextApiRequest, NextApiResponse } from 'next';
import { getAllTasks } from '../../modules/taskManager';

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Use a method from taskmanager.ts to fetch all tasks
  const tasks = getAllTasks();

  // Send the tasks as a response
  res.status(200).json({ message: "Hello API", tasks });
};