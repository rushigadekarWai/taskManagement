import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/User';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private userService: AuthService, private router:Router){}

  users:User[]=[];

  ngOnInit(){
    
this.getUsers();
  
  }

  getUsers(){
    this.userService.getUserList().subscribe((data:User[])=>{
      console.log(data);
    })
  }

  @ViewChild('toast', { static: false }) toast!: ElementRef;

  signUp(user: User, userForm: NgForm) {
    this.userService.saveUsers(user).subscribe((data: User) => {
      if (data) {
        userForm.resetForm();
  
        // ✅ Show success toast
        this.showToast('Sign up successful! Redirecting to login...', 'success');
  
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 2000);
      }
    }, err => {
      console.log('Something went wrong');
    });
  }
  
  // ✅ Function to show toast notification
  showToast(message: string, type: 'success' | 'error' | 'warning') {
    const toastElement = this.toast.nativeElement;
    toastElement.innerText = message;
  
    // Apply different classes based on toast type
    toastElement.className = `custom-toast ${type} show-toast`;
  
    // Hide toast after 3 seconds
    setTimeout(() => {
      toastElement.classList.remove('show-toast');
    }, 3000);
  }

  

}
