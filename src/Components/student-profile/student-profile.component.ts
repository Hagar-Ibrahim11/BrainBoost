import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../Services/student/student.service';
import { StudentDTO } from '../../models/student-dto';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit {
  studentForm!: FormGroup;
  passwordForm!: FormGroup;
  imageForm!: FormGroup;
  studentId!: number;
  student!: StudentDTO;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
    this.loadStudent();

    this.studentForm = this.fb.group({
      Fname: ['', Validators.required],
      Lname: ['', Validators.required]
    });

    this.passwordForm = this.fb.group({
      CurrentPassword: ['', Validators.required],
      NewPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.imageForm = this.fb.group({
      file: [null, Validators.required]
    });
  }

  loadStudent(): void {
    this.studentService.GetStudentData(this.studentId).subscribe(data => {
      this.student = data;
      this.studentForm.patchValue({
        Fname: this.student.fname,
        Lname: this.student.lname
      });
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const updatedStudent: StudentDTO = {
        ...this.student,
        fname: this.studentForm.get('Fname')?.value,
        lname: this.studentForm.get('Lname')?.value
      };
      this.studentService.updateStudent(updatedStudent).subscribe(() => {
        alert('Student updated successfully');
      });
    }
  }

  onChangePassword(): void {
    console.log(this.authService.userData);
  
    if (this.passwordForm.valid) {
      let userId = '';
  
      if (this.authService.claims.role === 'Student') {
        userId = this.authService.claims.userId;
      }
  
      const request = {
        UserId: userId, 
        CurrentPassword: this.passwordForm.get('CurrentPassword')?.value,
        NewPassword: this.passwordForm.get('NewPassword')?.value
      };
  
      this.studentService.updatePassword(request).subscribe(() => {
        alert('Password updated successfully');
      });
    }
  }
  

  onUploadImage(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.studentService.uploadImage(file, this.studentId).subscribe(url => {
        this.student.pictureUrl = url;
        alert('Image uploaded successfully');
      });
    }
  }
}
