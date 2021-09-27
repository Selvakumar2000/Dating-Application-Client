import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRequestCount=0; //inc. and dec. each time when we make a request and a request completes

  constructor(public spinnerService:NgxSpinnerService) { }

  busy()
  {
    this.busyRequestCount++;
    this.spinnerService.show(undefined,  //show(spinner_name,configuration)
      {
        type:'ball-fussion',
      });
  }

  idle()
  {
    this.busyRequestCount--;
    if(this.busyRequestCount<=0)
    {
      this.busyRequestCount=0;
      this.spinnerService.hide();
    }

  }
}