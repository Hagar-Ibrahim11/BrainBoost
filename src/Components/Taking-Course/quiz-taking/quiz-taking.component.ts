import { Component, OnInit } from '@angular/core';
import { IQuiz } from '../../../models/iquiz';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../Services/course/course.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICheckAnswer } from '../../../models/icheck-answer';

@Component({
  selector: 'app-quiz-taking',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './quiz-taking.component.html',
  styleUrl: './quiz-taking.component.css'
})
export class QuizTakingComponent implements OnInit  {

  Quiz!:IQuiz
  QuizCheckAnswer!:ICheckAnswer
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {
    this.GetQuiz()
  }
  ngOnInit(): void {
    this.QuizCheckAnswer={
      CourseId:1,
      QuizId:this.Quiz.id,
      QuestionId:[],
      AnswerId:[]
    }

  }
  GetQuiz()
  {
    this.courseService.GetTakingQuiz(1).subscribe({

      next: (data: IQuiz) => {
        this.Quiz = data;
        console.log(this.Quiz);
      },
      error: (error) => {
        console.error('Error fetching courses:', error); // Log any errors
      },
      complete: () => {
        console.log('courses fetched successfully'); // Log completion
      },
    });
  }
  handleCorrectAnswer(AnswerId: number,QuestionId: number){
    const questionIndex = this.QuizCheckAnswer.QuestionId.indexOf(QuestionId);

    if (questionIndex !== -1) {
      // If the question already has an answer, update it
      this.QuizCheckAnswer.AnswerId[questionIndex] = AnswerId;
    } else {
      // If the question is being answered for the first time, add it
      this.QuizCheckAnswer.QuestionId.push(QuestionId);
      this.QuizCheckAnswer.AnswerId.push(AnswerId);
    }
    console.log( this.QuizCheckAnswer.QuestionId)
    console.log( this.QuizCheckAnswer.AnswerId)



  }
}
