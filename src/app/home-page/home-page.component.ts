import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthModalComponent } from '../modals/auth-modal/auth-modal.component';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  bsModalRef: BsModalRef;

  loading = false;
  
  constructor(public accountService: AccountService, public modalService: BsModalService,
              public router: Router) { }

  ngOnInit(): void {
  }

  openLoginModal() {
    const initialState = {
      formType:'loginForm',
      title: 'GET STARTED',
    };
    this.bsModalRef = this.modalService.show(AuthModalComponent, {initialState});
    this.bsModalRef.content.okBtnName = 'LOG IN';
  }

  openSignInModal()
  {
    const initialState = {
      formType:'registerForm',
      title: 'SIGN UP',
    };
    this.bsModalRef = this.modalService.show(AuthModalComponent, {initialState});
    this.bsModalRef.content.okBtnName = 'REGISTER';
    this.bsModalRef.content.cancelBtnName = 'CANCEL';
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/'); 
  }

}
