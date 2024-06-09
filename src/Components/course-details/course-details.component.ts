import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  Role!: string;
  UserIsLogged!: boolean;
  env: string = environment.baseUrl + '/Images/Courses/';
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private dataService: DataService,
    private authService: AuthService,
    private enrollmentService: EnrollmentService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.courseId = +params['id'];
    });
    this.authService.userData.subscribe({
      next: () => {
        if (this.authService.userData.value != null) {
          this.Role =
            this.authService.userData.value[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ];
          this.UserIsLogged = true;
        } else {
          this.UserIsLogged = false;
          this.Role = '';
        }
      },
      error: () => {},
    });
  }
  ngOnInit(): void {
    this.courseService.getCourseDetails(this.courseId).subscribe({
      next: (data: ICourseDetails) => {
        this.crsDetails = data;
        console.log(data);
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
    const currentUrl = this.router.url;
    if (this.UserIsLogged) {
      this.enrollmentData = {
        studentId: 1,
        courseId: courseId,
        isActive: false,
      };
      this.enrollmentService
        .Enroll(this.enrollmentData)
        .subscribe((data: IPaymentUrl) => {
          window.location.href = data.url;
        });
    } else {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: currentUrl },
      });
    }
  }
}
