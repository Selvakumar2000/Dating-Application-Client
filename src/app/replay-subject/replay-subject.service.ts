import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReplaySubjectService {

  data=new ReplaySubject<number>(3); ///i want to store last 5 values
  constructor() { }
}
