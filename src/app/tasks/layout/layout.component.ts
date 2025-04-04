import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterOutlet, RouterLinkActive, NgIf],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  // constructor(private router: Router) {}

  // logout() {
  //   localStorage.removeItem('user');
  //   this.router.navigate(['/login']);

  
  // }
  
  closeNavbar() {
    const navbar = document.getElementById('navbarNav');
    if (navbar && navbar.classList.contains('show')) {
      navbar.classList.remove('show'); // Remove the Bootstrap "show" class
    }
  }
  userName: string | null = '';
  userEmail: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.userName = userData.name || 'User';  // Default if name is missing
      this.userEmail = userData.email || ''; 
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.userName = null;
    this.userEmail = null;
    this.router.navigate(['/login']);
  }
}
