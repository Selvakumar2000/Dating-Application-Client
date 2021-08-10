import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model:any={};
  constructor(private service:AccountService,public toastr:ToastrService) { }

  ngOnInit(): void {
  }

  register()
  {
    this.service.register(this.model).subscribe(
      response=>
      {
        console.log(response);
        this.cancel();
      },
      error=>
      {
        console.log(error);
        this.toastr.error(error.error);
      }
    )
  }
  cancel()
  {
    this.cancelRegister.emit(false);
  }
}
