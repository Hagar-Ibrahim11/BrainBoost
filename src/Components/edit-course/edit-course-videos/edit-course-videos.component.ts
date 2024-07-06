import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { InputAngularMaterialComponent } from "../../Inputs/input-angular-material/input-angular-material.component";
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-edit-course-videos",
  standalone: true,
  templateUrl: "./edit-course-videos.component.html",
  styleUrl: "./edit-course-videos.component.css",
  imports: [
    InputAngularMaterialComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EditCourseVideosComponent {
  AddChapter() {
    this.courseScheduleForm.push(
      new FormArray<any>([
        new FormGroup({
          videoFile: new FormControl<File | null>(null, Validators.required),
          title: new FormControl("", Validators.required),
        }),
      ])
    );
  }
  AddLecture(chapterIndex: number) {
    this.courseScheduleForm.at(chapterIndex).push(
      new FormGroup({
        videoFile: new FormControl<File | null>(null, Validators.required),
        title: new FormControl("", Validators.required),
      })
    );
  }
  DeleteChapter(chapterIndex: number) {
    this.courseScheduleForm.removeAt(chapterIndex)
  }
  DeleteLecture(chapterIndex: number,lectureIndex:number) {
    this.courseScheduleForm.at(chapterIndex).removeAt(lectureIndex)
  }
  getChapter(index: number): FormGroup {
    return this.courseScheduleForm.get(`${index}`) as FormGroup;
  }
  getLecture(chapterIndex: number, lectureIndex: number): FormGroup {
    return this.courseScheduleForm
      .get(`${chapterIndex}`)
      ?.get(`${lectureIndex}`) as FormGroup;
  }
  @Input() coursePhoto!: FormControl;
  @Input() courseScheduleForm!: FormArray<FormArray>;
  photoTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
  ];
  videoTypes = [
    "video/mp4",
    "video/avi",
    "video/mov",
    "video/mkv",
    "video/webm",
    "video/flv",
    "video/wmv",
    "video/mpeg",
  ];
  photoExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
  videoExtensions = [
    ".mp4",
    ".avi",
    ".mov",
    ".mkv",
    ".webm",
    ".flv",
    ".wmv",
    ".mpeg",
    ".mpg",
  ];
  constructor() {}
  handleVideoInput($event: any, chapterIndex: number, questionIndex: number) {
    const file = $event.target.files[0] as File;
    if (
      this.videoTypes.includes(file.type) ||
      this.videoExtensions.some((ext) => file.name.endsWith(ext))
    ) {
      this.courseScheduleForm
        .get(`${chapterIndex}`)
        ?.get(`${questionIndex}`)
        ?.get("videoFile")
        ?.setValue(file);
    } else {
      alert("Invalid video file type");
    }
  }
  handlePhotoInput($event: any) {
    const file = $event.target.files[0] as File;
    if (
      this.photoTypes.includes(file.type) ||
      this.photoExtensions.some((ext) => file.name.endsWith(ext))
    ) {
      this.coursePhoto.setValue(file);
    } else {
      alert("Invalid photo file type");
    }
  }
}
