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
    // Fetch all tasks
    const fetchTasks = async () => {
      const response = await axios.get('/api/hello');
      const allTasks: Task[] = response.data;
      setTasks(allTasks);
      setActiveTasks(allTasks.filter(task => task.status === 'In Progress'));
      setCompletedTasks(allTasks.filter(task => task.status === 'Completed'));
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
                {tasks.filter(task => task.status === 'To-Do').map(task => (
                  <ListItem key={task.id}>
                    <ListItemText primary={task.title} secondary={task.description} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">In Progress</Typography>
              <List>
                {activeTasks.map(task => (
                  <ListItem key={task.id}>
                    <ListItemText primary={task.title} secondary={task.description} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">Completed</Typography>
              <List>
                {completedTasks.map(task => (
                  <ListItem key={task.id}>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={task.title} secondary={task.description} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default TaskBoard;
