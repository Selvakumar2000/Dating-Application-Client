import { Component, OnInit } from '@angular/core';
import { BehaviourSubjectService } from './behaviour-subject.service';

@Component({
  selector: 'app-behaviour-subject',
  template: `
    <h1>Using Behaviour Subject</h1>
    <p>
      {{data}}
    </p>
    <button (click)="sendData()">Send Data</button>
  `,
  styles: [
  ]
})
export class BehaviourSubjectComponent implements OnInit {

  constructor(private service:BehaviourSubjectService) { }
  data:number;
  
  ngOnInit(): void {
    //this.service.data.next(2); if we comment this,initial value will be subscribed
    this.service.data.next(2);
    this.service.data.subscribe(e=>this.data=e); //get the current value
    //this.service.data.next(3); //whenever we emit a new value,it will be subscribed
    //this.service.data.next(21);
  }

  sendData()
  {
    this.service.data.next(Math.random());
  }

}
