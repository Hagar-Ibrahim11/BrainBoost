import { Component } from '@angular/core';
import { CourseService } from '../../Services/course/course.service';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  ListOfCourses:any=[{}]
constructor(private courseservice:CourseService)
{}
ngOnInit() {
  this.GetAllCourses();
}

GetAllCourses() {
  this.courseservice.GetAllCoursesAsCards().subscribe(
    (data: any[]) => {
      this.ListOfCourses = data;
      console.log(this.ListOfCourses);
    },
    error => {
      console.error('Error fetching courses', error);
    }
  );
}
}

