import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Enviroment/enviroment';
import { IVideoState } from '../models/ivideo-state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VidService {
  constructor(private http: HttpClient) {}
  GetTakingVideos(id: number): Observable<IVideoState[]> {
    const api_key = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${api_key}`);
    return this.http.get<IVideoState[]>(
      `${environment.baseUrl}/api/Video/GetCourseVideos/${id}`,
      { headers: header }
    );
  }
  changeVideoState(id: number, status: boolean): Observable<IVideoState[]> {
    const api_key = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${api_key}`);
    return this.http.get<IVideoState[]>(
      `${environment.baseUrl}/api/Video/ChangeVideoState/${id}?status=${status}`,
      { headers: header }
    );
  }
  changeAllVideoState(id: number, status: boolean): Observable<any> {
    const api_key = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${api_key}`);
    return this.http.get<any>(
      `${environment.baseUrl}/api/Video/ChangeAllVideosState/${id}?status=${status}`,
      { headers: header }
    );
  }
  
}
