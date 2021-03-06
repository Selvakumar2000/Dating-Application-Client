import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import{HttpClientModule} from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import{BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule } from 'ngx-timeago';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot(
     {
       positionClass:'toast-bottom-right'
     }
    ),
    TabsModule.forRoot(),
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports:[
    HttpClientModule,
    BsDropdownModule,
    ToastrModule,
    NgxGalleryModule,
    TabsModule,
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule,
    PaginationModule,
    ButtonsModule,
    TimeagoModule,
    TooltipModule,
    ModalModule,
  ]
})
export class SharedModule { }