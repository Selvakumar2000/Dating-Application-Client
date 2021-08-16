import { Component, OnInit } from '@angular/core';
import { AyncSubjectService } from './aync-subject.service';

@Component({
  selector: 'app-aync-subject',
  template: `
    <h1>Using Async Subject</h1>
    <p>
     {{data}}
    </p>
  `,
  styles: [
  ]
})
export class AyncSubjectComponent implements OnInit {

  data:number;
  constructor(private service:AyncSubjectService) { }

  ngOnInit(): void {
    this.service.data.next(2);
    this.service.data.next(3);
    this.service.data.next(4);
    this.service.data.subscribe(e=>this.data=e);
    this.service.data.next(6);
    //this.service.data.complete();
    this.service.data.next(8);
    this.service.data.next(9);
    this.service.data.next(34);
    this.service.data.complete();
  }

}
