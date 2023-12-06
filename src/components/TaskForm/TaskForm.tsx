import React, { useState, useEffect } from "react";
import {
  IonInput,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import TodoService from "../../services/todoServices";
import "./TaskForm.css";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
}

interface RouteParams {
  id?: string;
}

const TaskForm: React.FC = () => {
  const [task, setTask] = useState<Task>({ id: "", title: "", completed: false, description: "" });
  const { id } = useParams<RouteParams>();
  const isEditing = id !== undefined;
  const history = useHistory();

  useEffect(() => {
    if (isEditing) {
      TodoService.loadTodos().then(todos => {
        const editTask = todos.find(t => t.id === id);
        if (editTask) setTask(editTask);
      });
    }
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.title.trim()) {
      alert("Please enter a task title");
      return;
    }

    TodoService.loadTodos().then(todos => {
      let updatedTodos = [];
      if (isEditing) {
        updatedTodos = todos.map(t => (t.id === id ? task : t));
      } else {
        const newTask = { ...task, id: Date.now().toString(), completed: false };
        updatedTodos = [...todos, newTask];
      }
      TodoService.saveTodos(updatedTodos).then(() => history.push("/tasks"));
    });
  };

  const handleInputChange = (e: CustomEvent, field: keyof Task) => {
    setTask({ ...task, [field]: e.detail.value! });
  };

  return (
    <IonContent>
      <form onSubmit={handleSubmit} className="task-form">
        <IonItem>
          <IonLabel position="floating">Task Title</IonLabel>
          <IonInput
            value={task.title}
            onIonChange={(e) => handleInputChange(e, "title")}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Description</IonLabel>
          <IonInput
            value={task.description}
            onIonChange={(e) => handleInputChange(e, "description")}
          />
        </IonItem>
        <IonButton expand="block" type="submit">
          Save Task
        </IonButton>
        <IonButton
          expand="block"
          color="light"
          onClick={() => history.push("/tasks")}
        >
          Cancel
        </IonButton>
      </form>
    </IonContent>
  );
};

export default TaskForm;
