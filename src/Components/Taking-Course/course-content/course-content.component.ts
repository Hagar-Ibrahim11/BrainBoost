import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../Services/course/course.service';
import { IQuiz } from '../../../models/iquiz';

@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.css'
})
export class CourseContentComponent implements OnInit  {
  Quiz!:IQuiz
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}
  ngOnInit(): void {
  
  }

}
