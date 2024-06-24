import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Enviroment/enviroment';
import { IVideoState } from '../models/ivideo-state';
import { Observable } from 'rxjs';
import { IGetComment } from '../models/videomodel/iget-comment';
import { IAddcomment } from '../models/videomodel/iaddcomment';

@Injectable({
  providedIn: 'root'
})
export class VidService {

  constructor(private http:HttpClient) { }
  GetTakingVideos(id:number):Observable<IVideoState[]>
  {
    const api_key = localStorage.getItem("token");
    const header= new HttpHeaders().set('Authorization', `Bearer ${api_key}`)
    return this.http.get<IVideoState[]>(
      `${environment.baseUrl}/api/Video/GetCourseVideos/${id}`,{headers: header}
    );
  }
  changeVideoState(id:number, status: boolean):Observable<any>{
    const api_key = localStorage.getItem("token");
    const header= new HttpHeaders().set('Authorization', `Bearer ${api_key}`)
    return this.http.get<any>(`${environment.baseUrl}/api/Video/ChangeVideoState/${id}?status=${status}`,{headers: header})
 }
 changeAllVideoState(id:number, status: boolean):Observable<any>{
  const api_key = localStorage.getItem("token");
  const header= new HttpHeaders().set('Authorization', `Bearer ${api_key}`)
  return this.http.get<any>(`${environment.baseUrl}/api/Video/ChangeAllVideosState/${id}?status=${status}`,{headers: header})
}
GetComments(id:number):Observable<IGetComment[]>{
  const api_key = localStorage.getItem("token");
  const header= new HttpHeaders().set('Authorization', `Bearer ${api_key}`)
  return this.http.get<IGetComment[]>(`${environment.baseUrl}/api/Video/getComment/${id}`,{headers: header})
}
AddComments(comment:IAddcomment):Observable<IGetComment[]>{
  const api_key = localStorage.getItem("token");
  const header= new HttpHeaders().set('Authorization', `Bearer ${api_key}`)
  const body = {
    Id: comment.id,
    Content: comment.content,
    VideoId: comment.videoId,

};
  return this.http.post<IGetComment[]>(`${environment.baseUrl}/api/Video/addComment/`,body,{headers: header})
}
}
