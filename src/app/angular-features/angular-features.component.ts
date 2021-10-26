import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-angular-features',
  templateUrl: './angular-features.component.html',
  styleUrls: ['./angular-features.component.css']
})
export class AngularFeaturesComponent implements OnInit {

  //*ngIf
  displayName =true;

  //ngSwitch
  color= "blue";

  //*ngFor
  colors = ["red", "orange", "green", "yellow", "blue" ];

  //componet interaction between appcomponent and angular-features component (parent to child)
 // @Input() parentData:any;
//parentData is a parentcomponent property and within this component we can use the 
//name property to access the parentcomponent property
  @Input('parentData') name:any;   //working

  //componet interaction between appcomponent and angular-features component (child to parent)
  @Output() childEvent = new EventEmitter();
  fireEvent()
  {
    this.childEvent.emit("Hi "+ this.name);
  }

  //pipe
  myName = "Selvakumar Raman";
  person = {
    "firstName" : "Selvakumar",
    "lastName" : "Raman",
    "Age" : "21"
  }

  date = new Date();
  
  constructor() { }

  ngOnInit(): void {
  }

}
