import React, { useEffect, useState, useRef } from "react";
import {
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonContent,
  IonAlert,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import TodoService from "../../services/todoServices";
import { Share } from '@capacitor/share';
import "./TaskList.css";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const history = useHistory();

  const fetchTasks = async () => {
    try {
      const loadedTasks = await TodoService.loadTodos();
      setTasks(loadedTasks);
    } catch (err) {
      console.error('Erreur lors de la récupération des tâches:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleTaskCompletion = async (task: Task) => {
    try {
      const updatedTasks = tasks.map(t => 
        t.id === task.id ? { ...t, completed: !t.completed } : t
      );
      await TodoService.saveTodos(updatedTasks);
      setTasks(updatedTasks);
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la tâche:', err);
    }
  };

  const handleEdit = (taskId: string) => {
    history.push(`/edit-task/${taskId}`);
  };

  const handleDelete = (taskId: string) => {
    setSelectedTask(taskId);
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    if (selectedTask) {
      const updatedTasks = tasks.filter(task => task.id !== selectedTask);
      await TodoService.saveTodos(updatedTasks);
      setTasks(updatedTasks);
    }
    setShowDeleteAlert(false);
  };

  const shareTask = async (task: Task) => {
    try {
      await Share.share({
        title: 'Partager la Tâche',
        text: `Tâche : ${task.title}\nDescription : ${task.description || ''}`,
        url: 'http://localhost:8100/tasks/' + task.id,
        dialogTitle: 'Partager cette tâche avec',
      });
    } catch (error) {
      console.error('Erreur lors du partage de la tâche:', error);
    }
  };

  return (
    <IonContent>
      {tasks.length > 0 ? (
        <IonList>
          {tasks.map((task) => (
            <IonItem key={task.id}>
              <IonLabel className={task.completed ? "task-completed" : ""}>
                {task.title}
              </IonLabel>
              <IonButton onClick={() => handleEdit(task.id)}>Edit</IonButton>
              <IonButton color="danger" onClick={() => handleDelete(task.id)}>
                Delete
              </IonButton>
              <IonButton onClick={() => toggleTaskCompletion(task)}>
                {task.completed ? "Invalider" : "Valider"}
              </IonButton>
              <IonButton onClick={() => shareTask(task)}>Partager</IonButton>
            </IonItem>
          ))}
        </IonList>
      ) : (
        <div>No tasks available</div>
      )}
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header="Confirm Delete"
        message="Are you sure you want to delete this task?"
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => setShowDeleteAlert(false),
          },
          {
            text: "Okay",
            handler: () => confirmDelete(),
          },
        ]}
      />
    </IonContent>
  );
};

export default TaskList;
