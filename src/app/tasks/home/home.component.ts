import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  totalUsers: number = 0;
  totalProjects: number = 0;
  totalTasks: number = 0;
  
  taskStats = [
    { title: 'Tasks Due Today', count: 0 },
    { title: 'In Progress', count: 0 },
    { title: 'Completed', count: 0 }
  ];
  
  constructor(private router: Router, private http:HttpClient) {}

  ngOnInit() {
    // In a real app, you'd fetch this data from an API
    this.fetchTotalUsers();
    this.fetchTotalProjects();
    this.fetchTotalTasks();
    this.updateClock();
  }

  fetchTotalUsers(){
    this.http.get<any[]>('http://localhost:3000/users').subscribe((data)=>{
      this.totalUsers = data.length;
    })
  }

  fetchTotalProjects() {
    this.http.get<any[]>('http://localhost:3000/projects').subscribe(data => {
      this.totalProjects = data.length;
    });
  }

  fetchTotalTasks() {
    this.http.get<any[]>('http://localhost:3000/tasks').subscribe(tasks => {
      this.totalTasks = tasks.length;

      // Calculate task stats
      const today = new Date().toISOString().split('T')[0];
      const dueToday = tasks.filter(task => task.dueDate === today).length;
      const inProgress = tasks.filter(task => task.status === 'In Progress').length;
      const completed = tasks.filter(task => task.status === 'Completed').length;

      this.taskStats = [
        { title: 'Tasks Due Today', count: dueToday },
        { title: 'In Progress', count: inProgress },
        { title: 'Completed', count: completed }
      ];
    });
  }

  // Example navigation or action methods
  viewUsers() {
    this.router.navigate(['/users']);
  }
  
  viewProjects() {
    this.router.navigate(['/projects']);
  }
  
  viewTasks() {
    this.router.navigate(['/users-tasks']);
  }
  
  updateClock(): void {
    setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
  
      const date = now.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
  
      const timeEl = document.getElementById('clock-time');
      const dateEl = document.getElementById('clock-date');
  
      if (timeEl && dateEl) {
        timeEl.innerText = time;
        dateEl.innerText = date;
      }
    }, 1000);}
 
}
