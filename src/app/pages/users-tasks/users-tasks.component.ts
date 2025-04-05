import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'delete';
@Component({
  selector: 'app-users-tasks',
  imports: [FormsModule, NgIf, NgFor, NgClass],
  templateUrl: './users-tasks.component.html',
  styleUrl: './users-tasks.component.css'
})
export class UsersTasksComponent {

  projectId!: number;
  projectName!: string;
  tasks: any[] = [];
  editableTask: any = {};
  addMode = false;
  editMode = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router:Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.projectId = +params['id'];
      this.projectName = params['title'];
      this.fetchTasks();
    });
  }

  fetchTasks(): void {
    this.http.get<any[]>('http://localhost:3000/tasks').subscribe((res) => {
      this.tasks = res.filter(task => task.projectId === this.projectId);
    });
  }

  openAddForm(): void {
    this.editableTask = {
      projectId: this.projectId,
      title: '',
      assignedTo: '',
      status: '',
      priority: '',
      estimate: '',
      timeSpent: '',
      dueDate: ''
    };
    this.addMode = true;
    this.editMode = false;
  }

  notificationMessage: string = '';
  notificationClass: string = '';
  showNotification: boolean = false;
  
  addTask(): void {
    this.http.post('http://localhost:3000/tasks', this.editableTask).subscribe(() => {
      this.fetchTasks();
      this.addMode = false;
      this.showToast('Task added successfully!', 'success');
    });
  }
  
  openEditForm(task: any): void {
    this.editableTask = { ...task };
    this.editMode = true;
    this.addMode = false;
  }

  updateTask(): void {
    this.http.put(`http://localhost:3000/tasks/${this.editableTask.id}`, this.editableTask).subscribe(() => {
      this.fetchTasks();
      this.editMode = false;
      this.showToast('Task updated successfully!', 'success');
    });
  }
  
  

  deleteTask(id: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.http.delete(`http://localhost:3000/tasks/${id}`).subscribe(() => {
        this.fetchTasks();
        this.showToast('Task deleted successfully!', 'delete');
      });
    }
  }
  
  
  
  cancelForm(): void {
    this.addMode = false;
    this.editMode = false;
    this.editableTask = {};
  }

  goToProjectList() {
    this.router.navigate(['/projects-list']); // Replace 'projects' with your actual route
  }

  showToast(message: string, type: 'success' | 'error' | 'info' | 'warning' | 'delete'): void {
    this.notificationMessage = message;
    this.notificationClass = `notification show ${type}`;
    this.showNotification = true;
  
    setTimeout(() => {
      this.showNotification = false;
    }, 2000);
  }
  
  
}
