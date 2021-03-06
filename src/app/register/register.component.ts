import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm:FormGroup;
  maxDate:Date;
  validationErrors:string[]=[];

  constructor(public accountService:AccountService,public toastr:ToastrService,public fb:FormBuilder,
              public router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate=new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
    //don't allow any selection of dates less than 18years ago
  }

  initializeForm()
  {
    this.registerForm=this.fb.group(
      {
        gender:['male'],
        username:['',Validators.required],
        knownAs:['',Validators.required],
        dateOfBirth:['',Validators.required],
        city:['',Validators.required],
        country:['',Validators.required],
        password:['',[Validators.required,
                      Validators.minLength(4),Validators.maxLength(8)]],
        confirmPassword:['',[Validators.required,this.matchValues('password')]]
      })
  }

  //check password and confirmpassword fields are match
  matchValues(matchTo:string):ValidatorFn
  { //all form control are derived from abstract control
    return (control:AbstractControl) =>
    {
      return control?.value==control?.parent?.controls[matchTo].value?null:{isMatching:true};
    }
  }

  register()
  {
    this.accountService.register(this.registerForm.value).subscribe(
      response=>
      {
        this.router.navigateByUrl('/members');
      },
      error=>
      {
        this.validationErrors=error;
      }
      );
  }
  cancel()
  {
    this.cancelRegister.emit(false);
  }
}