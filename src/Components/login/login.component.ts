import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, CommonModule,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    userName: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  credentials = { userName: '', password: '' };
  constructor(private router: Router, private authService: AuthService) {}
  login(): void {
    this.authService
      .login({
        userName: this.loginForm.value['userName']!,
        password: this.loginForm.value['password']!,
      })
      .subscribe(
        (response) => {
          this.authService.setToken(response.token);
          this.authService.decodeUserData();
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log('Login failed:', error);
        }
      );
  }
}
