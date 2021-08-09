import { Component, OnInit } from '@angular/core';
import { SubjectService } from './subject.service';

@Component({
  selector: 'app-subject',
  template: `
    <h1>Using Subject</h1>
    <p>
      {{data}}
    </p>
    <button (click)="sendData()">Send Data</button>
  `,
  styles: [
  ]
})
export class SubjectComponent implements OnInit {

  constructor(private service:SubjectService) { }

  data:number;

  ngOnInit(): void {
    this.service.data.next(2);
    this.service.data.subscribe(e=> (this.data=e)); //does not get the current value
  /*above,we emit 2,but we won't able to catch this.we only catch the next emitted value
  This is the falldown of using subject.what if we want to store the current data(ex:2) into our subject
  we can use behaviour subject.
  */
    this.service.data.next(8);//when we emit a value,it just send out to all the subscribers
  }

  sendData()
  {
    this.service.data.next(Math.random());
  }
}
