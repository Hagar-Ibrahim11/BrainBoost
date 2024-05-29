import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(``, credentials);
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(``, user);
  }

  logout(): void {
    localStorage.removeItem('token');
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
