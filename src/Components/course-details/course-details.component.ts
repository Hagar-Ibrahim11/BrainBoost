import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from '../../Services/cours.service';
import { ICourseDetails } from '../../models/icourse-details';
import { environment } from '../../Enviroment/enviroment';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
  candidateId!: number;
  crsDetails!:ICourseDetails
  env:string = environment.baseUrl+'/Images/Courses/'
  constructor(private route:ActivatedRoute,private courseService:CoursService)
  {
    // this.route.params.subscribe(params => {
    //   this.candidateId = +params['id']; // Convert to number (if needed)
    //   console.log(this.candidateId)
    // });
  }
  ngOnInit(): void {
    console.log(this.crsDetails)
    this.courseService.getCourseDetails(1).subscribe({
      next: (data:ICourseDetails) => {
        this.crsDetails = data;
        console.log(this.crsDetails)
      },
      error: (error) => {
        console.error('Error fetching courses:', error); // Log any errors
      },
      complete: () => {
        console.log('courses fetched successfully'); // Log completion
      }
    });

  }

}
