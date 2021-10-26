import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: {id:string, name:string};
  editUser: {id:string, name:string};

  @ViewChild('editForm') editForm:NgForm;
  
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    //no need to get data from queryparams, we can get it from resolver
    //data coming from the resolve is stored in the variable name data
    this.route.data.subscribe(data => {
      console.log(data);
         this.user = {
              id: data['user']['id'],
              name: data['user']['name']
          };
      this.editUser = {...this.user};
    });

    // this.route.params.subscribe((data:Params) => {
    //   this.user = {
    //     id: data['id'],
    //     name: data['name']
    //   };
      
    //   this.editUser = {...this.user};
    // });
  }

}
