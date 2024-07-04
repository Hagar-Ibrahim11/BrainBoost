import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutStudentComponent } from '../../app/about-student/about-student.component';
import { StudentCoursesComponent } from '../../app/student-courses/student-courses.component';
@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [AboutStudentComponent, StudentCoursesComponent, CommonModule]
  ,
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent {
  isSidebarCollapsed = false;
  isSidebarHidden = false; // Sidebar hidden by default on small screens
  currentComponent = 'about-student';

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

}
