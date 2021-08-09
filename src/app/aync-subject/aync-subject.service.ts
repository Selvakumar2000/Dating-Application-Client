import { Injectable } from '@angular/core';
import { AsyncSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AyncSubjectService {

  data = new AsyncSubject<number>();
  //only last value sent to the subscribers when the execution completed(calling complete() method)
  //only the last value emitted will be subscribed, similar to subject
  constructor() { }
}
