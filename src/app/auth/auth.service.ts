// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { User } from '../interfaces/User';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private isAuthenticated = false;  // Track login status
//   private loggedInUser: User | null = null; // Store user data

//   constructor(private http: HttpClient) { }

//   getUserList(): Observable<User[]> {
//     const url = 'http://localhost:3000/users';
//     return this.http.get<User[]>(url);
//   }

//   saveUsers(user: User): Observable<User> {
//     const url = 'http://localhost:3000/users';
//     return this.http.post<User>(url, user);
//   }


//   login(user: User) {
//     this.isAuthenticated = true;
//     this.loggedInUser = user;
//   }

//   logout() {
//     this.isAuthenticated = false;
//     this.loggedInUser = null;
//   }

//   isLoggedIn(): boolean {
//     return this.isAuthenticated;
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private loggedInUser: User | null = null;

  constructor(private http: HttpClient) {
    this.loadAuthState(); // Load authentication state on service initialization
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  saveUsers(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', user);
  }

  login(user: User) {
    this.isAuthenticated = true;
    this.loggedInUser = user;
    localStorage.setItem('user', JSON.stringify(user)); // Store in localStorage
  }

  logout() {
    this.isAuthenticated = false;
    this.loggedInUser = null;
    localStorage.removeItem('user'); // Remove from localStorage
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null; // Check localStorage
  }

  private loadAuthState() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.isAuthenticated = true;
      this.loggedInUser = JSON.parse(storedUser);
    }
  }
}
