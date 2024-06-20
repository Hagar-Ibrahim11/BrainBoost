import { Component, Input } from '@angular/core';
import { InputAngularMaterialComponent } from '../../Inputs/input-angular-material/input-angular-material.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseServiceService } from '../../../Services/course/course-service.service';

@Component({
  selector: 'app-add-course-videos',
  standalone: true,
  templateUrl: './add-course-videos.component.html',
  styleUrl: './add-course-videos.component.css',
  imports: [
    InputAngularMaterialComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AddCourseVideosComponent {
  @Input() courseMediaForm!: FormArray<FormGroup>;
  constructor(private courseService: CourseServiceService) {}
  handleFileInput($event: any, index: number) {
    const file = $event.target.files[0] as File;
    this.courseMediaForm.at(index).get('videoFile')?.setValue(file);
  }
  handleTitle($event: any, index: number) {
    this.courseMediaForm.at(index).get('title')?.setValue($event);
  }
  AddLectureForm() {
    this.courseMediaForm.controls.push(
      new FormGroup({
        videoFile: new FormControl<File | null>(null, Validators.required),
        title: new FormControl<string | null>(null, Validators.required),
      })
    );
  }
}
