import { Component, OnInit } from '@angular/core';
import { ReplaySubjectService } from './replay-subject.service';

@Component({
  selector: 'app-replay-subject',
  template: `
    <h1>Using Replay Subject</h1>
    <!-- <p>{{data | json}}</p> -->
  `,
  styles: [
  ]
})
export class ReplaySubjectComponent implements OnInit {

  data:number[]=[];

  constructor(private service:ReplaySubjectService) {
    this.service.data.next(100);
    this.service.data.next(200);
    this.service.data.next(300);
    this.service.data.next(400);
    this.service.data.next(500);
    this.service.data.next(600);
    this.service.data.subscribe(e => this.data.push(e));
    
   }

  ngOnInit(): void {
  }

}
