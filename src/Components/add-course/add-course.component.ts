import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { AddCourseDetailsComponent } from './add-course-details/add-course-details.component';
import { AddCourseVideosComponent } from './add-course-videos/add-course-videos.component';
import { CourseServiceService } from '../../Services/course/course-service.service';
@Component({
  selector: 'app-add-course',
  standalone: true,
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
  imports: [
    AddCourseDetailsComponent,
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AddCourseVideosComponent,
  ],
})
export class AddCourseComponent {
  courseDetailsForm = new FormGroup({
    courseName: new FormControl('', Validators.required),
    courseDescription: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    categoryId: new FormControl(null, Validators.required),
  });
  courseLecturesForm = new FormArray<FormGroup>(
    [
      new FormGroup({
        videoFile: new FormControl<File | null>(null, Validators.required),
        title: new FormControl<string | null>(null, Validators.required),
      }),
    ],
    Validators.minLength(1)
  );
  constructor(
    private courseService: CourseServiceService,
  ) {}
  addCourseDetails() {
    this.courseService
      .addCourse({
        Name: this.courseDetailsForm.value.courseName!,
        Description: this.courseDetailsForm.value.courseDescription!,
        Price: this.courseDetailsForm.value.price!,
        TeacherId: 1,
        CategoryId: this.courseDetailsForm.value.categoryId!,
        CertificateHeadline: 'string',
        CertificateAppreciationParagraph: 'string',
      })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  addCourseLectures() {
    this.courseLecturesForm.controls.forEach((element, index) => {
      const formdata = new FormData();
      formdata.append(
        'Title',
        this.courseLecturesForm.controls.at(index)?.value.title
      );
      formdata.append(
        'VideoFile',
        this.courseLecturesForm.controls.at(index)?.value.videoFile
      );
      this.courseService.addVideo(formdata).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    });
  }
}
