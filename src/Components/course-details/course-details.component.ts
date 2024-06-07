import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourseDetails } from '../../models/icourse-details';
import { environment } from '../../Enviroment/enviroment';
import { CourseService } from '../../Services/course/course.service';
import { DataService } from '../../Services/sharedData/data.service';

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
    private courseService: CourseService,
    private dataService: DataService
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
}
