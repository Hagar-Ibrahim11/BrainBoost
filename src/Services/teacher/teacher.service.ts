import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}
  addTeacher(insertedTeacher: {
    jobTitles: string;
    aboutYou: string;
    photo: File;
    yearsOfExperience: number;
    userId:string|null
  }): Observable<any> {
    const insertedTeacherForm = new FormData();
    insertedTeacherForm.append("jobTitles",insertedTeacher.jobTitles)
    insertedTeacherForm.append("aboutYou",insertedTeacher.aboutYou)
    insertedTeacherForm.append("photo",insertedTeacher.photo)
    insertedTeacherForm.append("yearsOfExperience",insertedTeacher.yearsOfExperience.toString())
    insertedTeacherForm.append("userId",insertedTeacher.userId!)
    return this.http.post(
      `${environment.baseUrl}/api/Teacher/AddTeacher`,
      insertedTeacherForm
    );
  }
}
