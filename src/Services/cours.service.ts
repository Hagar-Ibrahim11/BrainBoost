import { Injectable } from '@angular/core';
import { ICourseDetails } from '../models/icourse-details';
import { HttpClient } from '@angular/common/http';
import { environment } from '../Enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private getbyidAPIURL=`${environment.baseUrl}/api/Course/GetCourse/`
  constructor(private http:HttpClient) { }

  ///get crs details
  getCourseDetails(id: number): Observable<ICourseDetails> {
    return this.http.get<ICourseDetails>(`${this.getbyidAPIURL}${id}`);
  }
}
