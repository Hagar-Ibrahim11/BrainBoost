import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { faUser, faEnvelope, faLock, faKey } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [    FontAwesomeModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(library: FaIconLibrary) {
    // Add icons to the library for convenient access in templates
    library.addIcons(faUser, faEnvelope, faLock, faKey);
  }
}
