import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styles: [
  ]
})
export class MemberDetailComponent implements OnInit {

  member:Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(public memberService:MembersService,public route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
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

  
  loadMember()
  {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(
      member=>
      {
        this.member=member;
        this.galleryImages=this.getImages();
      }
    )
  }
}
