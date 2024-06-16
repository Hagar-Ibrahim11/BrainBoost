import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Init } from 'v8';
import { environment } from '../../Enviroment/enviroment';
import { Observable } from 'rxjs';
import { ITopTeacher } from '../../models/itop-teacher';
import { ICurrentCourses } from '../../models/icurrent-courses';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardServiceService {

  constructor(private httpclient:HttpClient) { }

  GetNumOfStudent(): Observable<Number> {
    return this.httpclient.get<Number>(
      `${environment.baseUrl}/api/Student/GetTotalNumOfStudent`
    );
  }

  GetNumOfCourse(): Observable<Number> {
    return this.httpclient.get<Number>(
      `${environment.baseUrl}/api/Course/GetTotalNumOfCourse`
    );
  }

  GetNumOfTeacher(): Observable<Number> {
    return this.httpclient.get<Number>(
      `${environment.baseUrl}/api/Teacher/GetTotalNumOfTeachers`
    );
  }

  GetTopTeacher(): Observable<ITopTeacher[]> {
    return this.httpclient.get<ITopTeacher[]>(
      `${environment.baseUrl}/api/Teacher/GetTopTeachers`
    );
  }

  GetCurrentCourses(): Observable<ICurrentCourses[]> {
    return this.httpclient.get<ICurrentCourses[]>(
      `${environment.baseUrl}/api/Course/GetLastThreeCourses`
    );
  }
}

