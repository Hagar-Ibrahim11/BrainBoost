import { ICourseCardTeacherData } from './icourse-card-teacher-data';

export interface ICourseCardDetails {
  name: string | null;
  photoUrl: string | null;
  price: number | null;
  rate: number | null;
  teacher: ICourseCardTeacherData | null;
}
