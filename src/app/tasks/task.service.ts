import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // private apiUrl = 'http://localhost:3000/projects';  // API URL

  // constructor(private http: HttpClient) {}

  // /** 📌 GET: Fetch all projects */
  // getAllProjects(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  // /** 📌 GET: Fetch a single project by ID */
  // getProjectById(projectId: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/${projectId}`);
  // }

  // /** 📌 POST: Add a new project */
  // addProject(project: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, project);
  // }

  // /** 📌 PUT: Update an existing project */
  // updateProject(projectId: string, updatedProject: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/${projectId}`, updatedProject);
  // }

  // /** 📌 DELETE: Remove a project */
  // deleteProject(projectId: string): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}/${projectId}`);
  // }

  // // --------------------- TASKS CRUD METHODS --------------------- //

  // /** 📌 GET: Fetch tasks for a specific project */
  // getTasksByProjectId(projectId: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/${projectId}/tasks`);
  // }

  // /** 📌 POST: Add a new task to a project */
  // addTaskToProject(projectId: string, task: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/${projectId}/tasks`, task);
  // }

  // /** 📌 PUT: Update a task inside a project */
  // updateTaskInProject(projectId: string, taskIndex: number, updatedTask: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/${projectId}/tasks/${taskIndex}`, updatedTask);
  // }

  // /** 📌 DELETE: Remove a task from a project */
  // deleteTaskFromProject(projectId: string, taskIndex: number): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}/${projectId}/tasks/${taskIndex}`);
  // }
}
