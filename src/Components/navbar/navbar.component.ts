import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "../../Services/auth.service";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  goToDashBoard() {
    this.authService.routeConsideringToRole();
  }
  isLogin: boolean = false;
  constructor(private authService: AuthService) {
    authService.userData.subscribe({
      next: () => {
        if (authService.userData.getValue() !== null) {
          this.isLogin = true;
          console.log(authService.userData.getValue());
        } else {
          this.isLogin = false;
        }
      },
    });
  }
  logout() {
    this.authService.logout();
  }
}
