import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  registerMode=false;
  constructor() { }

  ngOnInit(): void {
    
  }

  registerToggle()
  {
    this.registerMode=true;
  }

  cancelRegisterMode(event:boolean)
  {
    this.registerMode=event;
  }
}
