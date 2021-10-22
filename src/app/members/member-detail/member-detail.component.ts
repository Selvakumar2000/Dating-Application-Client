import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/_models/member';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/User';
import { take } from 'rxjs/operators';
import { MembersService } from 'src/app/_services/members.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {

  @ViewChild('memberTabs', {static:true}) memberTabs: TabsetComponent;
  member:Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTab:TabDirective; 
  messages:Message[]=[];
  user: User;

  

  constructor(public presenceService: PresenceService,public route: ActivatedRoute,
              public messageService: MessageService,public accountService: AccountService,
              public memberService:MembersService,public toastr:ToastrService,
              ) { 

      this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
        this.user = user;
      });

     
  }

  ngOnInit(): void {
    this.route.data.subscribe(data =>{
      this.member = data.member;
    })

    this.route.queryParams.subscribe(
      params =>
      {
        params.tab? this.selectTab(params.tab) : this.selectTab(0);
      }
    )

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages=this.getImages();

    
  }

  getImages():NgxGalleryImage[]
  {
    const imageUrls=[];
    for(const photo of this.member.photos)
    {
      imageUrls.push(
        {
          small: photo?.url, 
          medium: photo?.url,
          big: photo?.url
        }
      );
    }
    return imageUrls;
  }

  loadMessages()
  {
    this.messageService.getMessageThread(this.member.username).subscribe(
      response=>
      {
        this.messages=response;
      }
    )
  }

  selectTab(tabId:any)
  {
    this.memberTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective)
  {
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages' && this.messages.length === 0)
    {
      this.messageService.createHubConnection(this.user, this.member.username);
    }
    else
    {
      this.messageService.stopHubConnection();
    }
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  
  addLike(member:Member)
  {
    this.memberService.addLike(member.username).subscribe( 
      () =>
      {
        this.toastr.success('You have Liked '+ member.username);
      }
    )
  }

}