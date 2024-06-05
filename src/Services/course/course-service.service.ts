import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CourseServiceService {
  constructor(private http: HttpClient) {}
  addVideo(formdata: FormData): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/api/Course/AddVideo`,
      formdata
    );
  }
  addCourse(insertedCourse: {
    Name: string;
    Description: string;
    Price: number;
    TeacherId: number;
    CategoryId: number;
    CertificateHeadline: string;
    CertificateAppreciationParagraph: string;
  }): Observable<any> {
    console.log(insertedCourse)
    return this.http.post(
      `${environment.baseUrl}/api/Course/AddCourse`,
      insertedCourse
    );
  }
}
