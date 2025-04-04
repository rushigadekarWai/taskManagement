import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../interfaces/User';

interface Task {
  id: string;
  projectId: number;
  title: string;
  assignedTo: string;
  status: string;
  priority: string;
  estimate: string;
  timeSpent: string;
  dueDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/projects'; // Adjust the API URL accordingly

  constructor(private http: HttpClient) {}

  // Fetch all projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  // Fetch a single project by ID
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  // Add a new project
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

   // Update an existing project
   updateProject(id: number, project: Project): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, project);
  }

  // Delete a project by ID
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
  // getTasksByProjectId(projectId: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}?projectId=${projectId}`);
  // }

// deleteTask(taskId: any): Observable<any> {
//     return this.http.delete<any>(`${this.taskurl}/${taskId}`);
//   }
  
//   addTask(newTask: any): Observable<any> {
//     return this.http.post<any>('http://localhost:3000/tasks', newTask);
//   }

  // ✅ Add a new task for a project
  // addTask(newTask: any): Observable<any> {
  //   return this.http.post<any>(this.taskurl, newTask);
  // }
  // // ✅ Delete a task by ID
  // deleteTask(taskId: number): Observable<any> {
  //   return this.http.delete<any>(`${this.taskurl}/${taskId}`);
  // }


  // addTask(newTask: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, {
  //     ...newTask,
  //     id: `${Date.now()}`, // Generate a unique string-based ID
  //     projectId: Number(newTask.projectId) // Ensure projectId is a number
  //   });
  // }

  // // ✅ Delete a task
  // deleteTask(taskId: string): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}/${taskId}`);
  // }

  private apiUrl2 = 'http://localhost:3000/tasks';

  getTasksByProjectId(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl2}?projectId=${projectId}`);
  }

  // Add a new task
  // addTask(task: Task): Observable<Task> {
  //   return this.http.post<Task>(`${this.apiUrl}`, task);
  // }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl2}`, task);
  }
  
  
  // Delete a task
  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl2}/${taskId}`);
  }
  

  getTaskById(taskId: string): Observable<Task> {
    return this.http.get<Task>(`http://localhost:3000/tasks/${taskId}`);
  }
  
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`http://localhost:3000/tasks/${task.id}`, task);
  }
  
  











}
  


