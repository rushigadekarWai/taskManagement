import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  totalTasks: number = 0;
  completedTasks: number = 0;
  pendingTasks: number = 0;

  constructor() {}

  ngOnInit() {

  }

  taskStats = [
    { title: 'Tasks Due Today', count: 4 },
    { title: 'In Progress', count: 6 },
    { title: 'Completed', count: 14 }
  ];

}
