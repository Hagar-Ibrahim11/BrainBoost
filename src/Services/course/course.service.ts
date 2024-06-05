import { Injectable } from '@angular/core';
import { ICourseDetails } from '../../models/icourse-details';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../Enviroment/enviroment';
import { Observable } from 'rxjs';
import { ICourseCardDetails } from '../../models/icourse-card-details';
import { ICourseFilteration } from '../../models/icourse-filteration';
import { IQuiz } from '../../models/iquiz';

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
  GetFilteredCourses(
    filterationObj: ICourseFilteration
  ): Observable<ICourseCardDetails[]> {
    return this.http.get<ICourseCardDetails[]>(
      `${environment.baseUrl}/api/Course/GetFilteredCourses/${filterationObj}`
    );
  }
  GetSearchedCourses(searchString: string): Observable<ICourseCardDetails[]> {
    return this.http.get<ICourseCardDetails[]>(
      `${environment.baseUrl}/api/Course/GetSearchedCourses/${searchString}`
    );
  }
  GetTakingQuiz(id:number):Observable<IQuiz>
  {
    return this.http.get<IQuiz>(
      `${environment.baseUrl}/api/Course/GetCourseQuiz/${id}`
    );
  }
}
