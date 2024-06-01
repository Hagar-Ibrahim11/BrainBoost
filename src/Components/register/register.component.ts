import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  UserRegisterForm = new FormGroup(
    {
      userName: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).{13,}$'),
      ]),
      confirmPassword: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
      ]),
      Role: new FormControl(null, Validators.required),
      AgreeToAllTerms: new FormControl(false, Validators.requiredTrue),
    },
    { validators: this.passwordMatchValidator }
  );
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  }
  constructor(
    private router: Router,
    private RegisterService: AuthService
  ) {}
  register() {
    this.RegisterService.register(
      {
        UserName: this.UserRegisterForm.value['userName']!,
        FirstName: this.UserRegisterForm.value['firstName']!,
        LastName: this.UserRegisterForm.value['lastName']!,
        Password: this.UserRegisterForm.value['password']!,
        Email: this.UserRegisterForm.value['email']!
      },
      this.UserRegisterForm.value['Role']!
    ).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }
}
