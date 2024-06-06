import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../models/icategory';
import { environment } from '../../Enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}
  getAllCategory(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(
      `${environment.baseUrl}/api/Category/GetAllCategories`
    );
  }
  getCategoryById(id: number): Observable<ICategory> {
    return this.httpClient.get<ICategory>(
      `${environment.baseUrl}/api/Category/GetCategory/${id}`
    );
  }
}
