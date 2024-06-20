import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Enviroment/enviroment';
import { InsertedQuiz } from '../../Components/add-course/classes/inserted-quiz';

@Injectable({
  providedIn: 'root',
})
export class CourseServiceService {
  constructor(private http: HttpClient) {}
  addVideo(formdata: FormData,courseId:Number): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/api/Course/AddVideo/${courseId}`,
      formdata
    );
  }
  addCourse(insertedCourse: {
    Name: string;
    Description: string;
    Price: number;
    TeacherId: number;
    CategoryName: string;
    CertificateHeadline: string;
    Level: string;
    CertificateAppreciationParagraph: string;
    Language: string;
    Quiz:InsertedQuiz
  }): Observable<any> {
    // const insertedCourseForm = new FormData();
    // insertedCourseForm.append('Name', insertedCourse.Name);
    // insertedCourseForm.append('Description', insertedCourse.Description!);
    // insertedCourseForm.append('Price', insertedCourse.Price.toString());
    // insertedCourseForm.append('TeacherId', '1'); // assuming TeacherId is always 1
    // insertedCourseForm.append('CategoryName', insertedCourse.CategoryName);
    // insertedCourseForm.append('Level', insertedCourse.Level);
    // insertedCourseForm.append('CertificateHeadline', 'string');
    // insertedCourseForm.append('CertificateAppreciationParagraph', 'string');
    // insertedCourseForm.append('Language', insertedCourse.Language!);
    return this.http.post(
      `${environment.baseUrl}/api/Course/AddCourse`,
      insertedCourse
    );
  }
}
