import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../interfaces/User';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private userService:AuthService, private http:HttpClient, private router:Router){}
  
    users:User[]=[];
   


  
    ngOnInit(){
      // this.getUsers();
    }
  
    // getUsers(){
    //   this.userService.getUserList().subscribe((data:User[])=>{
    //     console.log(data[0].email);
    //   })
    // }



  // login(user:any, loginForms:NgForm){

  //   this.userService.getUserList().subscribe((data:User[])=>{
  //     const newUser = data.find((a:any)=>{
  //       return a.email === user.email && a.password === user.password;
  //     });
  //     if(newUser){
  //       console.log('login succsfully');
        
        
  //     }

  //   })

  //   if(user){
  //     loginForms.resetForm();
  //   }
   

  // }
  ngAfterViewInit() {
    // Ensure ViewChild is ready before using it
  }



  @ViewChild('toast', { static: false }) toast!: ElementRef;

  login(users:any,  loginForms:NgForm){
    this.http.get<any>('http://localhost:3000/users').subscribe((res:any)=>{
      const user = res.find((a:any)=>{
       return a.email === users.email && a.password === users.password;
      });
      if (user) {
        if (user.password === users.password) {
          // ✅ Show success toast
          this.showToast('Login successful! Redirecting...', 'success');
  
          this.userService.login(user);
          loginForms.resetForm();
  
          setTimeout(() => {
            this.router.navigate(['home']);
          }, 2000);
        } else {
          
          this.showToast('Incorrect password. Please try again.', 'error');
        }
      } else {
        // ⚠️ Show user not found toast
        this.showToast('User not found. Please sign up.', 'warning');
      }
    }, err => {
      console.log('Something went wrong');
    });
  }


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
