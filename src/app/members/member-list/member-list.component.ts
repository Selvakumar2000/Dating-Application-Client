import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/User';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members:Member[];
  pagination:Pagination;
  userParams:UserParams;
  user:User;
  username:string;
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];
  
  loading = false;

  constructor(public memberService:MembersService, public accountService:AccountService,
              public router:Router,public modalService:BsModalService,
              public presenceService: PresenceService,public messageService:MessageService) {
    this.userParams = this.memberService.getUserParams();
    this.accountService.currentUser$.pipe(take(1)).subscribe(res => {
      this.userParams.gender = res.gender == 'male'? 'female':'male';
      this.username=res.username;
    })
   }

   //filter modal
   config: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-dialog-centered'
  };

   modalRef?: BsModalRef;
   openModalWithClass(staticModal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(staticModal,this.config);
  }
   
  ngOnInit(): void {
    this.loadMembers();
  }

  resetFilters()
  {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  loadMembers()
  {
    this.loading=true;
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(
      response=>
      {
        this.loading=false;
        console.log(response);
        this.members=response.result;
        this.pagination=response.pagination;
        
      });
     
  }

  pageChanged(event:any)
  {
    console.log(event);
    this.userParams.pageNumber=event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/'); 
  }

}