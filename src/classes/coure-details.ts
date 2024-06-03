import { ICourseDetails } from "../models/icourse-details";

export class CoureDetails implements ICourseDetails {

  constructor(
    public id: number=0,
    public price: number=0,
    public name: string | null = "",
    public description: string | null = "",
    public photoUrl: string | null = "",
    public rate: number | null = 0,
    public fname: string | null = "",
    public lname: string | null = ""
  ) {}
}
