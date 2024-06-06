import { Injectable } from '@angular/core';
import { ICourseDetails } from '../../models/icourse-details';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../Enviroment/enviroment';
import { Observable } from 'rxjs';
import { ICourseCardDetails } from '../../models/icourse-card-details';
import { ICourseFilteration } from '../../models/icourse-filteration';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private getByIdApiUrl = `${environment.baseUrl}/api/Course/GetCourse/`;
  constructor(private http: HttpClient) {}

  ///get crs details
  getCourseDetails(id: number): Observable<ICourseDetails> {
    return this.http.get<ICourseDetails>(`${this.getByIdApiUrl}${id}`);
  }
  GetAllCoursesAsCards(): Observable<ICourseCardDetails[]> {
    return this.http.get<ICourseCardDetails[]>(
      `${environment.baseUrl}/api/Course/GetAllCoursesAsCards`
    );
  }
  GetFilteredCourses(filterationObj: any): Observable<ICourseCardDetails[]> {
    let params = new HttpParams();
    params = params.append('CategoryName', filterationObj.categoryName);
    params = params.append('Price', filterationObj.price);
    params = params.append('Rate', filterationObj.rate);
    return this.http.get<ICourseCardDetails[]>(
      `${environment.baseUrl}/api/Course/GetFilteredCourses`,{params}
    );
  }
  GetSearchedCourses(searchString: string): Observable<ICourseCardDetails[]> {
    return this.http.get<ICourseCardDetails[]>(
      `${environment.baseUrl}/api/Course/GetSearchedCourses/${searchString}`
    );
  }
}
