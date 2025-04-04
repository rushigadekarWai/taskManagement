
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { NgIf } from '@angular/common';


interface Task {
  id?: string;  
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
  selector: 'app-task-form',
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})


export class TaskFormComponent implements OnInit{

  projectId!: number;
  projectName: string = '';
  isEditMode: boolean = false; 


  newTask: Task = {
    id: '',
    projectId: 0,
    title: '',
    assignedTo: '',
    status: 'Open',
    priority: 'Low',
    estimate: '',
    timeSpent: '0 days',
    dueDate: ''
  };

  constructor(private router: Router, private route: ActivatedRoute, private taskService: ProjectService) {}

  // ngOnInit(): void {
  //   this.route.paramMap.subscribe(params => {
  //     this.projectId = Number(params.get('projectId'));
  //     this.projectName = params.get('projectName') || '';
  //     const taskId = params.get('taskId');
  //     console.log('🔍 Extracted Project ID:', this.projectId);
  
  //     if (!isNaN(this.projectId) && this.projectId > 0) {
  //       this.newTask.projectId = this.projectId;
  //     } else {
  //       console.error(Invalid project ID received in TaskFormComponent!');
  //     }
  

  //     if (taskId) {
  //       this.taskService.getTaskById(taskId).subscribe(task => {
  //         this.newTask = task;
  //         this.newTask.projectId = this.projectId;
  //       });
  //     }
  //   });
  // }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = Number(params.get('projectId'));
      this.projectName = params.get('projectName') || '';
      const taskId = params.get('taskId');
  
      console.log('🔍 Extracted Project ID:', this.projectId);
  
      if (!isNaN(this.projectId) && this.projectId > 0) {
        this.newTask.projectId = this.projectId;
      } else {
        console.error('❌ Invalid project ID received in TaskFormComponent!');
      }
  
      if (taskId) {
        this.isEditMode = true; 
        this.taskService.getTaskById(taskId).subscribe(task => {
          this.newTask = task;
          this.newTask.projectId = this.projectId; 
        });
      }
    });
  }
  

  

  // addTask(): void {
  //   const { id, ...taskToAdd } = this.newTask; // ✅ Exclude 'id'
  
  //   this.taskService.addTask(taskToAdd).subscribe((addedTask) => {
  //     console.log('✅ Task successfully added with ID:', addedTask.id);
  //     this.router.navigate(['/tasks', this.projectId]);
  //   });
  // }

  // saveTask(): void {
  //   if (this.isEditMode && this.newTask.id) {
  //     const taskToUpdate = {
  //       ...this.newTask,
  //       id: this.newTask.id as string 
  //     };
  
  //     this.taskService.updateTask(taskToUpdate).subscribe(updatedTask => {

  //       this.router.navigate(['/tasks', this.projectId]);
  //     });
  //   } else {
  //     const { id, ...taskToAdd } = this.newTask;
  //     this.taskService.addTask(taskToAdd).subscribe(addedTask => {
  //       this.router.navigate(['/tasks', this.projectId]);
  //     });
  //   }
  // }

  saveTask(): void {
    if (this.isEditMode && this.newTask.id) {
      const taskToUpdate = {
        ...this.newTask,
        id: this.newTask.id as string 
      };
  
      this.taskService.updateTask(taskToUpdate).subscribe({
        next: (updatedTask) => {
          this.showNotification('✅ Task updated successfully!', 'success');
          setTimeout(() => {
            this.router.navigate(['/tasks', this.projectId]);
          }, 1500);
        },
        error: (err) => {
          this.showNotification('❌ Failed to update task.', 'error');
          console.error(err);
        }
      });
  
    } else {
      const { id, ...taskToAdd } = this.newTask;
  
      this.taskService.addTask(taskToAdd).subscribe({
        next: (addedTask) => {
          this.showNotification('✅ Task added successfully!', 'success');
          setTimeout(() => {
            this.router.navigate(['/tasks', this.projectId]);
          }, 1500);
        },
        error: (err) => {
          this.showNotification('❌ Failed to add task.', 'error');
          console.error(err);
        }
      });
    }
  }
  

  @ViewChild('notification') notification!: ElementRef;

  showNotification(message: string, type: 'success' | 'error') {
    const note = this.notification.nativeElement;
    note.innerText = message;
    note.className = `notification ${type} show`;

    setTimeout(() => {
      note.classList.remove('show');
    }, 3000);
  }
  // saveTask() {
  //   console.log("✅ saveTask triggered:", this.newTask);
  // }
  
  
  

  // addTask(): void {
  //   if (this.newTask.id) {
  //     // ✨ UPDATE mode
  //     this.taskService.updateTask(this.newTask).subscribe((updatedTask) => {
  //       console.log('✅ Task successfully updated:', updatedTask);
  //       this.router.navigate(['/tasks', this.projectId]);
  //     });
  //   } else {
  //     // ➕ ADD mode
  //     const { id, ...taskToAdd } = this.newTask;
  //     this.taskService.addTask(taskToAdd).subscribe((addedTask) => {
  //       console.log('✅ Task successfully added with ID:', addedTask.id);
  //       this.router.navigate(['/tasks', this.projectId]);
  //     });
  //   }
  // }
  
  goBack() {
    this.router.navigate(['/tasks', this.projectId]);
  }
  

}