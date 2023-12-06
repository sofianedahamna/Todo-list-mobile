import React, { useEffect, useState } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import TodoService from '../../services/todoServices';
import './TaskDetail.css';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean; // Ajoutez cette propriété si nécessaire
}

interface RouteParams {
  id: string;
}

const TaskDetail: React.FC = () => {
  const [task, setTask] = useState<Task | null>(null);
  const { id } = useParams<RouteParams>();
  const history = useHistory();

  useEffect(() => {
    TodoService.loadTodos().then(todos => {
      const foundTask = todos.find(t => t.id === id);
      setTask(foundTask || null);
    });
  }, [id]);

  return (
    <IonContent>
      {task ? (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{task.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {task.description}
          </IonCardContent>
        </IonCard>
      ) : (
        <div>Task not found or failed to load</div>
      )}
      <IonButton expand="block" onClick={() => history.push('/tasks')}>Back to List</IonButton>
    </IonContent>
  );
};

export default TaskDetail;
