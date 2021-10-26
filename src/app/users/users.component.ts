import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  id=1;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onCategories()
  {
    //navigate to page programmatically
    //this.router.navigateByUrl('/categories');
    //this.router.navigate(['/categories',this.id]); //we can pass more parameters
    this.router.navigateByUrl('/categories');
  }

}
