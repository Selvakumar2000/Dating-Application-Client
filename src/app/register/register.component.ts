import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
//access parent component(home) property here
  @Input() usersFromHomeComponent:any;
  @Output() cancelRegister = new EventEmitter();
  model:any={};
  constructor() { }

  ngOnInit(): void {
  }

  register()
  {
    console.log(this.model);
  }
  cancel()
  {
    this.cancelRegister.emit(false);
  }
}
