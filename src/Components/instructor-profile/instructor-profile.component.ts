import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TeacherService } from "../../Services/teacher/teacher.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-instructor-profile",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./instructor-profile.component.html",
  styleUrl: "./instructor-profile.component.css",
})
export class InstructorProfileComponent {
  handlePhotoInput($event: any) {
    const file = $event.target.files[0] as File;
    this.aboutTeacherForm.controls.photo.setValue(file)
  }
  userId:string|null=''
  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      console.log(params);
      this.userId = params.get('id');
    });
  }

  submit() {
    if (this.aboutTeacherForm.invalid) {
      this.errorsExistedinsubmit = !this.errorsExistedinsubmit;
    } else {
      this.teacherService
        .addTeacher({
          jobTitles: this.aboutTeacherForm.controls.jobTitles.value!,
          aboutYou: this.aboutTeacherForm.controls.aboutYou.value!,
          photo: this.aboutTeacherForm.controls.photo.value!,
          yearsOfExperience:
            this.aboutTeacherForm.controls.yearsOfExperience.value!,
            userId:this.userId
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
  }
  aboutTeacherForm = new FormGroup({
    jobTitles: new FormControl("", Validators.required),
    aboutYou: new FormControl("", Validators.required),
    photo: new FormControl<File | null>(null),
    yearsOfExperience: new FormControl<number | null>(
      null,
      Validators.required
    ),
  });
  errorsExistedinsubmit: boolean = false;
}
