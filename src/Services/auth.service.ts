import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../Enviroment/enviroment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient, private router: Router) {
    this.loadUserData();
  }
  confirmMail(EmailReceiver:string){
    return this.http.get<any>(
      `${environment.baseUrl}/api/Account/sendMail?EmailReceiver=${EmailReceiver}`,
    );
  }
  loadUserData() {
    const token = this.getToken();
    if (token) {
      this.decodeUserData();
    }
  }
  decodeUserData() {
    let encodedToken = JSON.stringify(this.getToken());
    let decodedToken: any = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
  }
  login(credentials: { userName: string; password: string }): Observable<any> {
    return this.http.post<any>(
      `${environment.baseUrl}/api/Account/login`,
      credentials
    );
  }

  register(user: any, role: string): Observable<any> {
    return this.http.post<any>(
      `${environment.baseUrl}/api/Account/register?role=${role}`,
      user
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userData.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
