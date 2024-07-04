import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IstudentDetails } from '../../models/istudent-details';
import { environment } from '../../Enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpclient:HttpClient) { }
  GetStudentData(studentId:number): Observable<IstudentDetails> {
    return this.httpclient.get<IstudentDetails>(
      `${environment.baseUrl}/api/Student/GetById/${studentId}`
    );
  }
}
