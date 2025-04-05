import { Component } from '@angular/core';
import { PageServiceService } from '../services/page-service.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-users-list',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

  users: any[] = [];
  filteredUsers: any[] = [];
  searchQuery: string = '';
  sortDirection: { [key: string]: boolean } = {
    name: true,
    email: true,
    role: true
  };

  constructor(private userService: PageServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.filteredUsers = res;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }
  noResultsFound: boolean = false;
  onSearch(): void {

    const query = this.searchQuery.trim().toLowerCase();
  
  if (!query) {
    this.filteredUsers = [...this.users];
    this.noResultsFound = false;
    return;
  }
  
  this.filteredUsers = this.users.filter(user =>
    user.name.toLowerCase().includes(query)
  );
  
  this.noResultsFound = this.filteredUsers.length === 0;
  }
  
  

  sortUsers(key: string): void {
    const direction = this.sortDirection[key] ? 1 : -1;

    this.filteredUsers.sort((a, b) => {
      const valA = a[key].toLowerCase();
      const valB = b[key].toLowerCase();
      return valA < valB ? -1 * direction : valA > valB ? 1 * direction : 0;
    });

    this.sortDirection[key] = !this.sortDirection[key];
  }

}
