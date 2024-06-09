import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaymentUrl } from '../../models/ipayment-url';
import { environment } from '../../Enviroment/enviroment';
import { Observable } from 'rxjs';
import { IEnrollment } from '../../models/ienrollment';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  constructor(private httpclient: HttpClient) {}
  Enroll(enrollmentData: IEnrollment): Observable<IPaymentUrl> {
    const authToken = localStorage.getItem('token');
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${authToken}`
    );
    return this.httpclient.post<IPaymentUrl>(
      `${environment.baseUrl}/api/Enrollment/Enroll`,
      enrollmentData,
      { headers: header }
    );
  }
}
