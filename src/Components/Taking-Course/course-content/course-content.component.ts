import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../Services/course/course.service';
import { IQuiz } from '../../../models/iquiz';
import { QuizService } from '../../../Services/quiz.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../../Services/enrollment/enrollment.service';

@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.css',
})
export class CourseContentComponent implements OnInit {
  Quiz!: IQuiz;
  msg: string = '';
  constructor(
    private courseService: CourseService,
    private QuizService: QuizService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.handleExamSuccess();

  }
  handleExamSuccess() {
    if (this.QuizService.stdDegree > -1) {
      if (this.QuizService.stdState == 'succeeded')
        this.msg = `you have successfully finish quiz go take your certificate`;
      else this.msg = `you have failed in the quiz please try again`;
    }
    this.QuizService.stdDegree = -1;
  }
}
