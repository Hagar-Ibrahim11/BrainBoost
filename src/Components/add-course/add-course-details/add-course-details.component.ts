import { Component, Input } from '@angular/core';
import { InputAngularMaterialComponent } from '../../Inputs/input-angular-material/input-angular-material.component';
import { AutoSelectAngularMaterialComponent } from '../../Inputs/auto-select-angular-material/auto-select-angular-material.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../Enviroment/enviroment';
import { response } from 'express';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-course-details',
  standalone: true,
  imports: [InputAngularMaterialComponent, AutoSelectAngularMaterialComponent],
  templateUrl: './add-course-details.component.html',
  styleUrl: './add-course-details.component.css',
})
export class AddCourseDetailsComponent {
  @Input() courseDetailsForm !:FormGroup;
  categoryOptions: { id: number; name: string }[] = [];
  constructor(http: HttpClient) {
    http
      .get<{ id: number; name: string }[]>(
        `${environment.baseUrl}/api/Category/GetCategory`
      )
      .subscribe({
        next: (response) => {
          this.categoryOptions = response;
        },
        error: (error) => {},
      });
  }
}
