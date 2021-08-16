import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typescript-basics',
  templateUrl: './typescript-basics.component.html',
  styles: [
  ]
})
export class TypescriptBasicsComponent implements OnInit {
data1:number; //by default it is any
data2:number|string|boolean;
  constructor() {

    this.data1=30; //data can predict its type
    //this.data1='selva'; shows error
    this.data2=34;
    this.data2='selva';
    this.data2=true;
   }

 

  ngOnInit(): void {
  }

}
