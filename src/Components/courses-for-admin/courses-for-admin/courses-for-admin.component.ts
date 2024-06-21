import { Component, OnInit } from '@angular/core';
import { ICourseCardDetails } from '../../../models/icourse-card-details';
import { CommonModule } from '@angular/common';
import { AdminDashboardServiceService } from '../../../Services/AdminDashboard/admin-dashboard-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-for-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-for-admin.component.html',
  styleUrl: './courses-for-admin.component.css'
})
export class CoursesForAdminComponent implements OnInit{
  courses: ICourseCardDetails[] = [];
  constructor(private admindashboardservice:AdminDashboardServiceService ,private router: Router)
  {}
  ngOnInit(): void {
    this.GetAllCourses();
  }
  GetAllCourses()
  {
    this.admindashboardservice.GetAllCourses().subscribe(
      (data: ICourseCardDetails[]) => {
        this.courses = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  GoToCourseDetails(id: number) {
    this.router.navigate(['/courseDetails', id]);
  }
  DeleteCourse(courseId:number)
  {
    this.admindashboardservice.DeleteCourse(courseId).subscribe(
      () => {
        this.GetAllCourses();
      },
      (error) => {
        console.error(error);
      }
    );

  }

}
