import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { userName: '', password: '' };
  constructor(private router: Router, private authService: AuthService){}
  login(): void {
    this.authService.login(this.credentials).subscribe(
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
