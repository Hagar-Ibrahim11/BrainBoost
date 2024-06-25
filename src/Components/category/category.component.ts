import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../Services/category/category.service';
import { ICategory } from '../../models/icategory';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories:ICategory[]=[]
  categoryName: string = '';

constructor(private categoryservice:CategoryService){}
 ngOnInit(): void {
   this.GetAllCategories()
 }
GetAllCategories()
{
  this.categoryservice.getAllCategory().subscribe(
    (data: ICategory[]) => {
      this.categories = data;
    },
    (error) => {
      console.error(error);
    }
  );
}

DeleteCategory(categoryId:Number)
  {
    this.categoryservice.DeleteCategory(categoryId).subscribe(
      () => {
        this.GetAllCategories();
        console.log("deleted successfully");
        
      },
      (error) => {
        console.error(error);
      }
    )
  }

  AddCategory(): void {
    const category: ICategory = { id: null, name: this.categoryName, isDeleted: null };
    this.categoryservice.AddCategory(category).subscribe(
      (response: ICategory) => {
        console.log('Category added successfully:', response);
        console.log(response)
        this.categories.push(response);
        this.categoryName = '';
      },
      (error: any) => {
        console.error('Error adding category:', error);
      }
    );
  }
}
