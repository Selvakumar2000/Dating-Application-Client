import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  marginDesign = false;
  registerMode=false;
  constructor() { }

  ngOnInit(): void {
    
  }

  registerToggle()
  {
    this.marginDesign = true;
    this.registerMode=!this.registerMode;
  }

  cancelRegisterMode(event:boolean)
  {
    this.marginDesign = false;
    this.registerMode=event;
  }
}