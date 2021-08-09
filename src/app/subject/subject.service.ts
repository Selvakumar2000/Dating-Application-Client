import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  data =new Subject<number>();  //Subject allows publish and subscribe and it can emit a value using next()
  // setData(value:number)
  // {
  //   this.data.next(value); 
  // }

  constructor() { }
}
