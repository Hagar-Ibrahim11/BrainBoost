import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { json } from 'stream/consumers';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData=null;
  constructor(private http: HttpClient, private router: Router) { }
  decodeUserData()
  {
    let encodedToken=JSON.stringify(this.getToken());
    let decodedToken:any= jwtDecode(encodedToken);
    console.log(decodedToken);
    this.userData=decodedToken;
  }
  login(credentials: { userName: string, password: string }): Observable<any> {
    return this.http.post<any>(`http://localhost:5079/api/Account/login`, credentials);
  }

  register(user: any,role :string): Observable<any> {
    return this.http.post<any>(`http://localhost:5079/api/Account/register?role=${role}`, user);
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
