import { Component } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatStepperModule } from "@angular/material/stepper";
import { CommonModule } from "@angular/common";
import { AddCourseDetailsComponent } from "./add-course-details/add-course-details.component";
import { AddCourseVideosComponent } from "./add-course-videos/add-course-videos.component";
import { CourseServiceService } from "../../Services/course/course-service.service";
import { AddCourseQuestionsComponent } from "./add-course-questions/add-course-questions.component";
import { InsertedQuiz } from "./classes/inserted-quiz";
@Component({
  selector: "app-add-course",
  standalone: true,
  templateUrl: "./add-course.component.html",
  styleUrl: "./add-course.component.css",
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
    AddCourseQuestionsComponent,
  ],
})
export class AddCourseComponent {
  constructor(private courseService: CourseServiceService) {}
  Quiz: InsertedQuiz = new InsertedQuiz();
  courseDetailsForm = new FormGroup({
    courseName: new FormControl("", Validators.required),
    courseDescription: new FormControl("", Validators.required),
    price: new FormControl(0, Validators.required),
    categoryName: new FormControl("", Validators.required),
    courseLanguage: new FormControl("", Validators.required),
    courseLevel: new FormControl("", Validators.required),
  });
  courseMediaForm = new FormArray<FormGroup>(
    [
      // new FormGroup({
      //   courseImage: new FormControl<File | null>(null, Validators.required),
      // }),
      new FormGroup({
        videoFile: new FormControl<File | null>(null, Validators.required),
        title: new FormControl<string | null>(null, Validators.required),
      }),
    ],
    Validators.minLength(1)
  );
  courseQuestionsForm = new FormArray<FormGroup>(
    [
      new FormGroup({
        headLine: new FormControl<string>("", Validators.required),
        answers: new FormArray<FormControl>(
          [
            new FormControl("", Validators.required),
            new FormControl("", Validators.required),
          ],
          Validators.minLength(2)
        ),
        rightAnswer: new FormControl<string>("", Validators.required),
        degree: new FormControl<number>(0, Validators.required),
      }),
    ],
    [Validators.minLength(1)]
  );
  addCourseLectures(courseId:number) {
    this.courseMediaForm.controls.forEach((element, index) => {
      const formdata = new FormData();
      formdata.append(
        "Title",
        this.courseMediaForm.controls.at(index)?.value.title
      );
      formdata.append(
        "VideoFile",
        this.courseMediaForm.controls.at(index)?.value.videoFile
      );
      this.courseService.addVideo(formdata,courseId).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    });
  }
  addCourseQuiz() {
    console.log(this.courseQuestionsForm);
    this.courseQuestionsForm.controls.forEach((FormGroup, questionsIndex) => {
      this.Quiz.NumOfQuestions++;
      this.Quiz.Degree += FormGroup.controls["degree"].value;
      this.Quiz.Questions.push({
        HeadLine: FormGroup.controls["headLine"].value,
        Degree: FormGroup.controls["degree"].value,
        Choices: [],
      });
      let answers = FormGroup.controls["answers"] as FormArray;
      answers.controls.forEach((answer, answerIndex) => {
        this.Quiz.Questions[questionsIndex].Choices.push({
          Choice: answer.value,
          isCorrect: false,
        });
        if (answer.value == FormGroup.controls["rightAnswer"].value) {
          this.Quiz.Questions[questionsIndex].Choices[
            answerIndex
          ].isCorrect = true;
        }
      });
    });
  }
  addCourse() {
    this.courseService
      .addCourse({
        Name: this.courseDetailsForm.value.courseName!,
        Description: this.courseDetailsForm.value.courseDescription!,
        Price: this.courseDetailsForm.value.price!,
        TeacherId: 2,
        CategoryName: this.courseDetailsForm.value.categoryName!,
        Level: this.courseDetailsForm.value.courseLevel!,
        CertificateHeadline: "string",
        CertificateAppreciationParagraph: "string",
        Language: this.courseDetailsForm.value.courseLanguage!,
        Quiz:this.Quiz
      })
      .subscribe({
        next: (response) => {
          this.addCourseLectures(response['id']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  display() {
    console.log(this.courseQuestionsForm);
  }
}
