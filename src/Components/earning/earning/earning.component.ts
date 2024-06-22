import { Component, OnInit } from '@angular/core';
import { AdminDashboardServiceService } from '../../../Services/AdminDashboard/admin-dashboard-service.service';
import { ITeacherEarning } from '../../../models/iteacher-earning';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-earning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './earning.component.html',
  styleUrl: './earning.component.css'
})
export class EarningComponent implements OnInit{
  constructor(private admindashboardservice:AdminDashboardServiceService,
    private router:Router
  ) {
  }
  ngOnInit(): void {
    this.GetTotalInstructorEarning();
    this.GetTotalWebsiteEarning();
    this.GetTotalEarning()
    this.GetTeachereWithHisEarning()
    }
  TotalWebsiteEarning!:Number
  TotalInstructorEarning!:Number
  TotalEarning!:Number
  TeacherWithHisEarning!:ITeacherEarning[]

  GetTotalInstructorEarning() {
    this.admindashboardservice.GetTotalInstructorEarning().subscribe(
      (data: Number) => {
        this.TotalInstructorEarning = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  GetTotalWebsiteEarning() {
    this.admindashboardservice.GetTotalWebsiteEarning().subscribe(
      (data: Number) => {
        this.TotalWebsiteEarning = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  GetTotalEarning() {
    this.admindashboardservice.GetTotalEarning().subscribe(
      (data: Number) => {
        this.TotalEarning = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  GetTeachereWithHisEarning() {
    this.admindashboardservice.GetTeacherWithHisEarning().subscribe(
      (data: ITeacherEarning[]) => {
        console.log(data)
        this.TeacherWithHisEarning = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  GoToTeacheEarningDetails(id: Number) {
    this.router.navigate(['/TeacherEarningDetails', id]);
  }
}
