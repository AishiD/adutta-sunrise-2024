import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'To-Do' | 'In Progress' | 'Completed';
}

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/hello');
        console.log("API Response:", response.data); // Log the API response

        const allTasks: Task[] = response.data.tasks || response.data;
        console.log("All tasks:", allTasks); // Log all tasks

        if (Array.isArray(allTasks)) {
          setTasks(allTasks);
          const active = allTasks.filter(task => task.status === 'In Progress');
          const completed = allTasks.filter(task => task.status === 'Completed');
          console.log("Active tasks:", active); // Log active tasks
          console.log("Completed tasks:", completed); // Log completed tasks
          setActiveTasks(active);
          setCompletedTasks(completed);
        } else {
          console.error("Tasks data is not an array:", allTasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">To-Do</Typography>
              <List>
                {tasks.length > 0 ? (
                  tasks.filter(task => task.status === 'To-Do').length > 0 ? (
                    tasks.filter(task => task.status === 'To-Do').map(task => (
                      <ListItem key={task.id}>
                        <ListItemText primary={task.title} secondary={task.description} />
                      </ListItem>
                    ))
                  ) : (
                    <Typography>No tasks in To-Do</Typography> // Placeholder
                  )
                ) : (
                  <Typography>Loading tasks...</Typography> // Loading placeholder
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">In Progress</Typography>
              <List>
                {activeTasks.length > 0 ? (
                  activeTasks.map(task => (
                    <ListItem key={task.id}>
                      <ListItemText primary={task.title} secondary={task.description} />
                    </ListItem>
                  ))
                ) : (
                  <Typography>No tasks in progress</Typography> // Placeholder
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">Completed</Typography>
              <List>
                {completedTasks.length > 0 ? (
                  completedTasks.map(task => (
                    <ListItem key={task.id}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary={task.title} secondary={task.description} />
                    </ListItem>
                  ))
                ) : (
                  <Typography>No completed tasks</Typography> // Placeholder
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default TaskBoard;
