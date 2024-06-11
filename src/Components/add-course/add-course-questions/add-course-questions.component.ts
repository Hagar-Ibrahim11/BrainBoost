import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-course-questions',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-course-questions.component.html',
  styleUrl: './add-course-questions.component.css',
})
export class AddCourseQuestionsComponent {
display($event: Event) {
throw new Error('Method not implemented.');
}
  @Input() courseQuestionsForm!: FormArray<FormGroup>;
  addNewQuestion() {
    this.courseQuestionsForm.controls.push(
      new FormGroup({
        headLine: new FormControl<string>('', Validators.required),
        answers: new FormControl<string[]>([''], Validators.minLength(2)),
        rightAnswer: new FormControl<string>('', Validators.required),
      })
    )
  }
  handleChoices($event: Event) {
    console.log($event);
  }
}
