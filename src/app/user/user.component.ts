import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user:{ id:string; name:string };
  //ActivatedRoute --> to get the currently activatedroute
  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.user = {
//changes in route can't be reflected.Ex:If I change the property inside the component
//it won't reflect 
      id: this.route.snapshot.params['id'], 
      name: this.route.snapshot.params['name']
    };

    //listen the dynamic route paramters
    this.route.params.subscribe((data:Params) => {
      this.user = {
        id: data['id'],
        name: data['name']
      };
    });

//listen the dynamic queryparams and fragments & print it on console using snapshot
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

//listen the dynamic queryparams and fragments & print it on console using subscribe
    this.route.queryParams.subscribe(data => {
      console.log(data);
    });

    this.route.fragment.subscribe(data => {
      console.log(data);
    })

  }

  getDetails()
  {
    //passing query params
    this.router.navigate(
      ['/users', 2, 'sk'],{
        queryParams: {page:1, search:'sk'},
        fragment: 'loading',
      })
  }

  onEditUser()
  {
    this.router.navigate(['/users', this.user.id, this.user.name, 'edit'], {
/*
merge -->whatever the queryparameters coming from url, it merge with the existing 
queryparams
preserve --> just forward that.
*/       
      queryParamsHandling: 'preserve'
    });
  }

}
