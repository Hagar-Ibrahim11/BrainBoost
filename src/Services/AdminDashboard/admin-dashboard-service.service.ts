import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Init } from 'v8';
import { environment } from '../../Enviroment/enviroment';
import { Observable } from 'rxjs';
import { ITopTeacher } from '../../models/itop-teacher';
import { ICurrentCourses } from '../../models/icurrent-courses';
import { ITopStudent } from '../../models/itop-student';
import { IcourseNotApproved } from '../../models/icourse-not-approved';

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

  GetNumOfEnrolledCourses(): Observable<Number> {
    return this.httpclient.get<Number>(
      `${environment.baseUrl}/api/Student/GetTotalNumOfEnrolledCourses`
    );
  }

  GetTopStudent(): Observable<ITopStudent[]> {
    return this.httpclient.get<ITopStudent[]>(
      `${environment.baseUrl}/api/Student/GetTopStudent`
    );
  }
  GetNotApprovedCourses(): Observable<IcourseNotApproved[]> {
    return this.httpclient.get<IcourseNotApproved[]>(
      `${environment.baseUrl}/api/Course/GetNotApprovedCourses`
    );
  }
  ApproveCourse(CourseId:number):Observable<IcourseNotApproved>{
    return this.httpclient.put<IcourseNotApproved>(
      `${environment.baseUrl}/api/Course/ApproveCourse?courseId=${CourseId}`,CourseId
    );
  }
  GetTotalInstructorEarning(): Observable<Number> {
    return this.httpclient.get<Number>(
      `${environment.baseUrl}/api/Earning/GetTotalInstructorEarnings`
    );
  }
  GetTotalWebsiteEarning(): Observable<Number> {
    return this.httpclient.get<Number>(
      `${environment.baseUrl}/api/Earning/GetTotalWebsiteEarnings`
    );
  }
}

