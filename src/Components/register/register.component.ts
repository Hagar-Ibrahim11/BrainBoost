import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  standalone: true,
   imports: [FormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user: any = {email: '', password: '',userName:'',firstName:'',lastName:''};
  role:string='';
constructor(private router: Router, private http: HttpClient){}
register() {
  console.log(this.user,this.role);
  this.http.post(`http://localhost:5079/api/Account/register?role=${this.role}`, this.user, { responseType: 'text' }).subscribe(
    response => {
      console.log('Registration successful:', response);
      this.router.navigate(['/login']);
    },
    error => {
      console.error('Registration failed:', error);
      
    }
  );
}

}
