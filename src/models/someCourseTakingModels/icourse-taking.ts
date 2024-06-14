import { ICourseCardDetails } from "../icourse-card-details";
import { IState } from "./istate";

export interface ICourseTaking {
  id: number;
  name?: string;
  description?: string;
  price: number;
  photoUrl?: string;
  longDescription?: string;
  lastUpdate?: Date;
  language?: string;
  duration?: number;
  level?: string;
  rate?: number;
  numOfRates?: number;
  numOfVideos?: number;
  states: IState | null;
  courseCardData: ICourseCardDetails[] | null;
}
