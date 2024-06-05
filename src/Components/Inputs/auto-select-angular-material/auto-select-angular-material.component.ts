import { Component, Input,EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auto-select-angular-material',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './auto-select-angular-material.component.html',
  styleUrl: './auto-select-angular-material.component.css',
})
export class AutoSelectAngularMaterialComponent {
  myControl = new FormControl(null);
  @Input() options: {id:number,name:string}[] = [];
  @Input() placeHolder: string = '';
  @Input() class: string = '';
  @Output() optionSelected = new EventEmitter<any>();
  filteredOptions: Observable<{id:number,name:string}[]> | undefined;
  constructor(private http:HttpClient){}
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): {id:number,name:string}[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
