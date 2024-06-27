import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loading: boolean = false;
constructor(){}



loadMore() {
    // Simulate an API call or any asynchronous operation
    this.loading = true;
    setTimeout(() => {
        // Here you would fetch more data or perform some action
        this.loading = false;
    }, 2000); // Simulating a delay of 2 seconds
}
}
