
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
  
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username:[''],
      password:['']
    })
  }

  printValues(): void{
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }

  onSubmit(){

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.authenticate(username, password).subscribe({
      next: (user) => {
        if(user){
          sessionStorage.setItem('userId', user.id.toString());
          this.router.navigate(['/clienti']);
        }
        else {
          alert('errore credenziali');
        }
      }, 
      error:(err) => {
        console.error('Errore del server', err);
      }
    });

     console.log(this.loginForm.value);
     this.authService.getUsers().subscribe({
        next: (users) => {
           console.log(users);
         }, 
         error:(err) => {           
          console.error('Errore del server', err);
         }
    });
   }

}
