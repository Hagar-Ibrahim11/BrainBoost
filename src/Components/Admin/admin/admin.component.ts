import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../Services/admin/admin.service';
import { Iadmin } from '../../../models/iadmin';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  AllAdmins!:Iadmin[]
  constructor(private adminservice:AdminService) {
  }
  ngOnInit(): void {
    this.GetAllAdmin();
  }
  GetAllAdmin() {
    this.adminservice.GetAllAdmins().subscribe(
      (data: Iadmin[]) => {
        this.AllAdmins = data;
      },
      (error) => {
        console.error('Error fetching Admins', error);
      }
    );
  }
  UpdateAdmin(updatedAdmin:Iadmin)
  {
    this.adminservice.UpdateAdmin(updatedAdmin).subscribe(
      () => {
        console.log("updated successfully");
      },
      (error) => {
        console.error(error);
      }
    )
  }
  DeleteAdmin(adminId:number)
  {
    this.adminservice.DeleteAdmin(adminId).subscribe(
      () => {
        this.GetAllAdmin();
        console.log("deleted successfully");
        
      },
      (error) => {
        console.error(error);
      }
    )
  }

}
