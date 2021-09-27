import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviourSubjectService {

  data =new BehaviorSubject<number>(20); //initial value here is 10
  constructor() { }
}
