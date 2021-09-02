import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent implements OnInit {

  //interpolation
  greetUser()
  {
    return "Hello " + this.name;
  }
  //property binding
  name = "selva";
  siteUrl = window.location.href;
  myId = "testId";
  isDisabled = false;

  //class binding
  alignmentClass = "alignment";
  hasError = false;
  isSpecial = true;
  messageClasses = {
    "text-success" : !this.hasError,
    "text-danger" : this.hasError,
    "text-special" : this.isSpecial
  }

  //style binding
  highlightColor = "#873600";
  titleStyles = {
    color : "#512E5F",
    fontStyle : "italic", //camelCase only work font-style wont work
    textAlign : "center",
    fontSize : "3em"
  }

  //event binding
  greeting = "";
  eventName : any;
  onlick(event:any)
  {
    console.log(event)
    this.greeting = this.name;
    this.eventName = event.type;
  }

  //template reference variable
  logMessage(value:any)
  {
    console.log(value);
  }

  //two way binding
  myName = "";

  

  constructor() { }

  ngOnInit(): void {
  }

  
}
