import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

  model:any={};
  constructor(public service:AccountService,public router:Router,public toastr:ToastrService) { }

  ngOnInit(): void {
  
  }

  login()
  {
    this.service.login(this.model).subscribe(
      response=>
      {
        //this.users=response;

        this.router.navigateByUrl('/members');
      },
      error=>
      {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }

  logout()
  {
    this.service.logout();
    this.router.navigateByUrl('/');
  }

}
