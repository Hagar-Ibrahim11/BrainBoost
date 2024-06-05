import { IQuestion } from "./iquestion";

export interface IQuiz {
  id: number;
  numOfQuestions: number;
  degree: number;
  minDegree: number;
  isDeleted: boolean;
  courseId: number;
  questions: IQuestion[];

}
