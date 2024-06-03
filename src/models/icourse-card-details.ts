import { ICourseCardTeacherData } from './icourse-card-teacher-data';

export interface ICourseCardDetails {
  name?: string;
  photoUrl?: string;
  price: number;
  rate?: number;
  teacher: ICourseCardTeacherData;
}
