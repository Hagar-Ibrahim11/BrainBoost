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
  claims: any = {};
  constructor(private http: HttpClient, private router: Router) {
    this.loadUserData();
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
    this.extractClaims(decodedToken);
  }
  extractClaims(decodedToken: any) {
    this.claims = {
      userId: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
      role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    };
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
