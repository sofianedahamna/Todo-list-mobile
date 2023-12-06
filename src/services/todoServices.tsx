import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  description?: string; // Ajoutez si vous avez besoin de descriptions pour les tâches
}

class TodoService {
  private static fileName = 'todos.json';

  static async saveTodos(todos: TodoItem[]): Promise<void> {
    await Filesystem.writeFile({
      path: this.fileName,
      data: JSON.stringify(todos),
      directory: Directory.Documents,
      encoding: Encoding.UTF8, // Utilisez Encoding.UTF8 au lieu de 'utf-8'
    });
  }

  static async loadTodos(): Promise<TodoItem[]> {
    try {
      const contents = await Filesystem.readFile({
        path: this.fileName,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      // Assurez-vous que contents.data est une chaîne de caractères
      if (typeof contents.data === 'string') {
        return JSON.parse(contents.data);
      } else {
        console.error('Expected string for todo data, received Blob.');
      }
    } catch (e) {
      console.error('Error loading todos', e);
    }
    return []; // Retourner un tableau vide si une erreur survient ou si les données ne sont pas au format attendu
  }


  // Ajoute une nouvelle tâche
  static async addTodo(newTodo: Omit<TodoItem, 'id'>): Promise<void> {
    const todos = await this.loadTodos();
    const todoWithId = { ...newTodo, id: Date.now().toString() }; // Génération d'un ID unique
    await this.saveTodos([...todos, todoWithId]);
  }

  // Met à jour une tâche existante
  static async updateTodo(updatedTodo: TodoItem): Promise<void> {
    const todos = await this.loadTodos();
    const updatedTodos = todos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    await this.saveTodos(updatedTodos);
  }

  // Supprime une tâche
  static async deleteTodo(todoId: string): Promise<void> {
    const todos = await this.loadTodos();
    const filteredTodos = todos.filter(todo => todo.id !== todoId);
    await this.saveTodos(filteredTodos);
  }
}

export default TodoService;
