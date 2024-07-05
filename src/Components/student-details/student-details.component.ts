import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutStudentComponent } from '../../app/about-student/about-student.component';
import { StudentCoursesComponent } from '../../app/student-courses/student-courses.component';
import { StudentProfileComponent } from '../student-profile/student-profile.component';
import { StudentService } from '../../Services/student/student.service';
import { IstudentDetails } from '../../models/istudent-details';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [AboutStudentComponent, StudentCoursesComponent, CommonModule,StudentProfileComponent],
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  isSidebarCollapsed = false;
  isSidebarHidden = false; // Sidebar hidden by default on small screens
  currentComponent = 'about-student';
  studentData: IstudentDetails | undefined;

  constructor(
    private studentservice: StudentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const studentId = Number(params.get('id'));
      if (studentId) {
        this.GetStudentData(studentId);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 992) {
      this.isSidebarHidden = false;
    }
  }

  toggleSidebar() {
    if (window.innerWidth <= 992) {
      this.isSidebarHidden = !this.isSidebarHidden;
    } else {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }

  showComponent(component: string) {
    this.currentComponent = component;
  }

  GetStudentData(studentId: number) {
    this.studentservice.GetStudentData(studentId).subscribe(
      (data: IstudentDetails) => {
        this.studentData = data;
      },
      (error) => {
        console.error('Error fetching data of Student', error);
      }
    );
  }
}
