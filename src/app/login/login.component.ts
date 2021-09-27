import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../_models/login';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:Login = new Login();

  constructor(public accountService:AccountService,public router:Router,public toastr:ToastrService) { }

  ngOnInit(): void {
  }

  login()
  {
    this.accountService.login(this.model).subscribe(
      response=>
      {
        this.router.navigateByUrl('/members');
      });
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    
  }
}
