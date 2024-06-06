import { Component } from '@angular/core';
import { CourseService } from '../../Services/course/course.service';
import { CommonModule } from '@angular/common';
import { ICourseCardDetails } from '../../models/icourse-card-details';
import { ICategory } from '../../models/icategory';
import { CategoryService } from '../../Services/category/category.service';
import { error } from 'console';
import { listenerCount } from 'process';
import { ICourseFilteration } from '../../models/icourse-filteration';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  ListOfCourses: ICourseCardDetails[] = [];
  ListOfCategories: ICategory[] = [];
  FilterObj!: ICourseFilteration;
  priceString: string = '';
  constructor(
    private courseservice: CourseService,
    private categoryService: CategoryService
  ) {
    this.FilterObj = { categoryName: null, price: -1, rate: -1 };
  }
  ngOnInit() {
    this.GetAllCategories();
    this.courseservice.GetFilteredCourses(this.FilterObj).subscribe(
      (data: ICourseCardDetails[]) => {
        this.ListOfCourses = data;
        console.log(data);
      },
      (error) => {
        console.log('Error Fetching Filtered Courses');
      }
    );
    console.log('osa');
  }

  GetAllCourses() {
    this.courseservice.GetAllCoursesAsCards().subscribe(
      (data: ICourseCardDetails[]) => {
        this.ListOfCourses = data;
      },
      (error) => {
        console.error('Error fetching courses', error);
      }
    );
  }
  GetAllCategories() {
    this.categoryService.getAllCategory().subscribe(
      (data: ICategory[]) => {
        this.ListOfCategories = data;
        console.log('Hello' + this.ListOfCategories);
      },
      (error) => {
        console.error('Error fetching Categories', error);
      }
    );
  }
  checkPrice(price: any) {
    if (price > 0) {
      this.priceString = '$' + price.toString();
    } else {
      this.priceString = 'Free';
    }
  }

  getFilteredCoursesWithCatName(catName: string) {
    this.FilterObj.categoryName = catName;
    this.courseservice.GetFilteredCourses(this.FilterObj).subscribe(
      (data: ICourseCardDetails[]) => {
        this.ListOfCourses = data;
        console.log(data);
      },
      (error) => {
        console.log('Error Fetching Filtered Courses');
      }
    );
  }
  getFilteredCoursesWithPrice(price: number) {
    this.FilterObj.price = price;
    this.courseservice.GetFilteredCourses(this.FilterObj).subscribe(
      (data: ICourseCardDetails[]) => {
        this.ListOfCourses = data;
      },
      (error) => {
        console.log('Error Fetching Filtered Courses');
      }
    );
  }
  getFilteredCoursesWithRate(rate: number) {
    this.FilterObj.rate = rate;
    this.courseservice.GetFilteredCourses(this.FilterObj).subscribe(
      (data: ICourseCardDetails[]) => {
        this.ListOfCourses = data;
        console.log(data);
      },
      (error) => {
        console.log('Error Fetching Filtered Courses');
      }
    );
  }
}
