import { IReviewSomeDetails } from './ireview-some-details';
import { WhatTToLearn } from './what-tto-learn';

export interface ICourseDetails {
  id: number;
  name: string | null;
  description: string | null;
  price: number;
  photoUrl: string | null;
  rate: number | null;
  fname: string | null;
  lname: string | null;
  review: IReviewSomeDetails[];
  whatToLearn: WhatTToLearn[] | null;
}
