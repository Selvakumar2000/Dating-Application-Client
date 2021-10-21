
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { AuthModalComponent } from '../modals/auth-modal/auth-modal.component';
import { AccountService } from '../_services/account.service';
import { MessageService } from '../_services/message.service';
import { PresenceService } from '../_services/presence.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  bsModalRef: BsModalRef;

  loading = false;

  username:string;
  
  constructor(public accountService: AccountService, public modalService: BsModalService,
              public router: Router,public presenceService:PresenceService,public messageService:MessageService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
          this.username=user.username;
      });
  }

  ngOnInit(): void {
    
  }

  openLoginModal() {
    const initialState: ModalOptions = {
      backdrop:'static',
      keyboard:false,
      initialState: {
        formType:'loginForm',
        title: 'GET STARTED',
      }
    };
    this.bsModalRef = this.modalService.show(AuthModalComponent, initialState);
    this.bsModalRef.content.okBtnName = 'LOG IN';
  }

  openSignInModal()
  {
    const initialState: ModalOptions = {
      backdrop:'static',
      keyboard:false,
      initialState: {
        formType:'registerForm',
        title: 'SIGN UP',
      }
    };
    this.bsModalRef = this.modalService.show(AuthModalComponent, initialState);
    this.bsModalRef.content.okBtnName = 'REGISTER';
    this.bsModalRef.content.cancelBtnName = 'CANCEL';
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/'); 
  }

}
