import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TaskService } from '../task.service';
import { ProjectService } from '../services/project.service';
import { Project } from '../../interfaces/User';
import { FormsModule } from '@angular/forms';

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

@Component({
  selector: 'app-task-list',
  imports: [RouterLink, NgIf, NgFor, FormsModule, NgClass],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
   
  projectId!: number;
  relatedTasks: Task[] = [];
  projectName:string='';

  constructor(private route: ActivatedRoute, private taskService: ProjectService,private router: Router) {}

  ngOnInit(): void {
    // Get Project ID from URL
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.projectName = this.route.snapshot.paramMap.get('name') || '';
    this.fetchTasks();
  }

  // Fetch tasks related to the project ID
  fetchTasks(): void {
    this.taskService.getTasksByProjectId(this.projectId).subscribe(tasks => {
      this.relatedTasks = tasks;
    });
  }

  // Handle task addition
  onTaskAdded(newTask: Task): void {
    this.relatedTasks.push(newTask);
  }

  // Delete a task
  // deleteTask(taskId: string): void {
  //   this.taskService.deleteTask(taskId).subscribe(() => {
  //     this.relatedTasks = this.relatedTasks.filter(task => task.id !== taskId);
  //   });

  // }
  @ViewChild('notification') notification!: ElementRef;

  showNotification(message: string, type: 'success' | 'error') {
    const note = this.notification.nativeElement;
    note.innerText = message;
    note.className = `notification ${type} show`;
  
    setTimeout(() => {
      note.classList.remove('show');
    }, 3000);
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.relatedTasks = this.relatedTasks.filter(task => task.id !== taskId);
        this.showNotification('🗑️ Task deleted successfully!', 'success');
      },
      error: (err) => {
        this.showNotification('❌ Failed to delete task.', 'error');
        console.error(err);
      }
    });
  }
  
  editTask(taskId: string): void {
    this.router.navigate(['/add-task', this.projectId, taskId]);
  }
  
  
  
  
  
  // editTask(taskId: string): void {
  //   this.router.navigate(['/add-task', this.projectId, this.projectName, taskId]);
  // }
  


  navigateToAddTask(): void {
    console.log('Navigating to Add Task, Project ID:', this.projectId);
    this.router.navigate(['/add-task', this.projectId]);
    
  }
  // navigateToAddTask(): void {
  //   console.log('Navigating to Add Task:', this.projectId, this.projectName);
  //   this.router.navigate(['/add-task', this.projectId, this.projectName]);
  // }
  

  goBack() {
    this.router.navigate(['/projects']) // Navigates to the previous page
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Open':
        return 'open';
      case 'In Progress':
        return 'in-progress';
      case 'Completed':
        return 'completed';
      default:
        return '';
    }
  }
  
}
  
