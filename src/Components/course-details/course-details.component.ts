import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourseDetails } from '../../models/icourse-details';
import { environment } from '../../Enviroment/enviroment';
import { CourseService } from '../../Services/course/course.service';

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
  env: string = environment.baseUrl + '/Images/Courses/';
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {
    // this.route.params.subscribe(params => {
    //   this.courseId = +params['id']; // Convert to number (if needed)
    //   console.log(this.courseId)
    // });
  }
  ngOnInit(): void {
    console.log(this.crsDetails);
    this.courseService.getCourseDetails(1).subscribe({
      next: (data: ICourseDetails) => {
        this.crsDetails = data;
        console.log(this.crsDetails);
      },
      error: (error) => {
        console.error('Error fetching courses:', error); // Log any errors
      },
      complete: () => {
        console.log('courses fetched successfully'); // Log completion
      },
    });
  }
}
