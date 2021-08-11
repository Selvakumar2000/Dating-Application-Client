import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {

  //navigationExtras -> can be only accessed inside the constructor,so that we can get them quickly
  error:any;
  constructor(public router:Router) { 
    const navigation=this.router.getCurrentNavigation();
    this.error=navigation?.extras?.state?.error;
  }

  ngOnInit(): void {
  }

}
