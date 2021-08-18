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
        type:'line-scale-party',
        bdColor:'rgba(255,255,255,0)',
        color:'#333333'
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
