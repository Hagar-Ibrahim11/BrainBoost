import { Component } from '@angular/core';
import { CourseService } from '../../Services/course/course.service';
import { CommonModule } from '@angular/common';
import { ICourseCardDetails } from '../../models/icourse-card-details';
import { ICategory } from '../../models/icategory';
import { CategoryService } from '../../Services/category/category.service';
import { error } from 'console';
import { listenerCount } from 'process';
import { ICourseFilteration } from '../../models/icourse-filteration';
import { Router } from '@angular/router';
import { ICourseDetails } from '../../models/icourse-details';
import { DataService } from '../../Services/sharedData/data.service';
import { environment } from '../../Enviroment/enviroment';
import { IPaginationCourse } from '../../models/ipagination-course';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  ListOfCourses: ICourseCardDetails[] = [];
  ListOfCategories: ICategory[] = [];
  FilterObj!: ICourseFilteration;
  SearchString!: string;
  priceString: string = '';
  currentCourse!: ICourseDetails;
  env: string = environment.baseUrl + '/';
  totalItems!: number;
  totalPages!: number;
  currentPage: number = 1;
  constructor(
    private courseservice: CourseService,
    private categoryService: CategoryService,
    private router: Router,
    private dataService: DataService
  ) {
    this.FilterObj = {
      categoryName: null,
      price: -1,
      rate: -1,
      durtion: -1,
      pageNumber: this.currentPage,
      pageSize: 12,
    };
  }

  ngOnInit() {
    this.GetAllCategories();
    this.GetAllCourses();
  }

  GetSearchCourses(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.SearchString = inputElement.value;
    this.courseservice
      .GetSearchedCourses(this.SearchString)
      .subscribe((data: ICourseCardDetails[]) => {
        this.ListOfCourses = data;
      });
  }
  GoToCourseDetails(id: number) {
    this.router.navigate(['/courseDetails', id]);
  }
  GetAllCourses() {
    this.courseservice.GetFilteredCourses(this.FilterObj).subscribe(
      (data: IPaginationCourse) => {
        this.ListOfCourses = data.courses;
        this.totalItems = data.totalItems;
        this.totalPages = data.totalPages;
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

  getFilteredCoursesWithCatName(catName: string | null) {
    console.log(catName);
    this.FilterObj.categoryName = catName;
    console.log(this.FilterObj);
    this.courseservice.GetFilteredCourses(this.FilterObj).subscribe(
      (data: IPaginationCourse) => {
        this.ListOfCourses = data.courses;
        this.totalItems = data.totalItems;
        this.totalPages = data.totalPages;
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
      (data: IPaginationCourse) => {
        this.ListOfCourses = data.courses;
        this.totalItems = data.totalItems;
        this.totalPages = data.totalPages;
      },
      (error) => {
        console.log('Error Fetching Filtered Courses');
      }
    );
  }
  getFilteredCoursesWithRate(rate: number) {
    this.FilterObj.rate = rate;
    this.courseservice.GetFilteredCourses(this.FilterObj).subscribe(
      (data: IPaginationCourse) => {
        this.ListOfCourses = data.courses;
        this.totalItems = data.totalItems;
        this.totalPages = data.totalPages;
      },
      (error) => {
        console.log('Error Fetching Filtered Courses');
      }
    );
  }
  getFilteredCoursesWithDuration(duration: number) {
    this.FilterObj.durtion = duration;
    this.courseservice.GetFilteredCourses(this.FilterObj).subscribe(
      (data: IPaginationCourse) => {
        this.ListOfCourses = data.courses;
        this.totalItems = data.totalItems;
        this.totalPages = data.totalPages;
      },
      (error) => {
        console.log('Error Fetching Filtered Courses');
      }
    );
  }
  handleResetFilteration() {
    const form = document.getElementById('filter-form') as HTMLFormElement;
    form.reset();
    this.FilterObj = {
      categoryName: null,
      price: -1,
      rate: -1,
      durtion: -1,
      pageNumber: this.currentPage,
      pageSize: 12,
    };
    this.courseservice.GetFilteredCourses(this.FilterObj).subscribe(
      (data: IPaginationCourse) => {
        this.ListOfCourses = data.courses;
        this.totalItems = data.totalItems;
        this.totalPages = data.totalPages;
      },
      (error) => {
        console.log('Error Fetching Filtered Courses');
      }
    );
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.FilterObj.pageNumber = this.currentPage;
    this.GetAllCourses();
  }
}
