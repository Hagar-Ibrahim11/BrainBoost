import { Injectable } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http:HttpClient) { }
}
