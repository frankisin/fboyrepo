import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb:FormBuilder,private router: Router){
     // Initialize the form with validators
     this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  // Function to handle the login logic
  login(): void {
    const { username, password } = this.loginForm.value;

    // Replace 'yourUsername' and 'yourPassword' with the actual valid credentials
    if (username === 'frankisin' && password === 'password') {
      // Navigate to the dashboard page
      this.router.navigate(['/dashboard']);
    } else {
      // Handle incorrect credentials (e.g., show an error message)
      console.log('Invalid username or password');
    }
  }

}
