import { Component, OnInit } from '@angular/core';
import { AdminDashboardServiceService } from '../../../Services/AdminDashboard/admin-dashboard-service.service';

@Component({
  selector: 'app-earning',
  standalone: true,
  imports: [],
  templateUrl: './earning.component.html',
  styleUrl: './earning.component.css'
})
export class EarningComponent implements OnInit{
  constructor(private admindashboardservice:AdminDashboardServiceService) {
  }
  ngOnInit(): void {
    this.GetTotalInstructorEarning();
    this.GetTotalWebsiteEarning();
    this.GetTotalEarning()
  }
  TotalWebsiteEarning!:Number
  TotalInstructorEarning!:Number
  TotalEarning!:Number
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
}
