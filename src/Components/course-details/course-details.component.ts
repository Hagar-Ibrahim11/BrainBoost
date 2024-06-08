import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourseDetails } from '../../models/icourse-details';
import { environment } from '../../Enviroment/enviroment';
import { CourseService } from '../../Services/course/course.service';
import { DataService } from '../../Services/sharedData/data.service';
import { AuthService } from '../../Services/auth.service';
import { EnrollmentService } from '../../Services/enrollment/enrollment.service';
import { IEnrollment } from '../../models/ienrollment';
import { IPaymentUrl } from '../../models/ipayment-url';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent {
  courseId!: number;
  crsDetails!: ICourseDetails;
  enrollmentData!: IEnrollment;
  paymentUrl!: IPaymentUrl;
  env: string = environment.baseUrl + '/Images/Courses/';
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private dataService: DataService,
    private authService: AuthService,
    private enrollmentService: EnrollmentService
  ) {}
  ngOnInit(): void {
    this.dataService.data$.subscribe((data) => {
      this.courseId = data;
    });
    this.courseService.getCourseDetails(this.courseId).subscribe({
      next: (data: ICourseDetails) => {
        this.crsDetails = data;
      },
      error: (error) => {
        console.error('Error fetching courses:', error); // Log any errors
      },
      complete: () => {
        console.log('courses fetched successfully'); // Log completion
      },
    });
  }
  handleEnrollCourse(courseId: number) {
    console.log(this.authService.userData);
    this.enrollmentData = {
      courseId: courseId,
      studentId: 1,
      isActive: false,
      id: 1,
    };
    this.enrollmentService
      .Enroll(this.enrollmentData)
      .subscribe((data: IPaymentUrl) => {
        window.location.href = data.url;
      });
  }
  checkUserLogged(userdata: any): boolean {
    if (userdata != null) {
      return true;
    } else {
      return false;
    }
  }
}
