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
  }
  TotalWebsiteEarning!:Number
  TotalInstructorEarning!:Number
  GetTotalInstructorEarning() {
    this.admindashboardservice.GetTotalInstructorEarning().subscribe(
      (data: Number) => {
        this.TotalInstructorEarning = data;
      },
      (error) => {
        console.error('Error fetching Num of Student', error);
      }
    );
  }
  GetTotalWebsiteEarning() {
    this.admindashboardservice.GetTotalWebsiteEarning().subscribe(
      (data: Number) => {
        this.TotalWebsiteEarning = data;
      },
      (error) => {
        console.error('Error fetching Num of Student', error);
      }
    );
  }
}
