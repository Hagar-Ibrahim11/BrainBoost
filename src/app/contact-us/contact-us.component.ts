import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  onSubmit() {
    // Handle form submission logic
    alert('Form submitted!');
  }
}
