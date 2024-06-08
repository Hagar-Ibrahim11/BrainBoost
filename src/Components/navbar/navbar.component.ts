import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLogin:boolean=false;
     constructor( private authService: AuthService)
     {
      authService.userData.subscribe({
        next:()=>{
          if(authService.userData.getValue()!==null)
            {
              this.isLogin=true;
              console.log(authService.userData.getValue());
            }
            else
            {
              this.isLogin=false;
              
            }
        }
      })
     }

}
