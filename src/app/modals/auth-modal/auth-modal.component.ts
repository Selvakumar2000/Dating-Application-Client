import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Login } from 'src/app/_models/login';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {

  title: string;
  okBtnName: string;
  cancelBtnName: string;
  formType: string;

  user:any;

  @Output() cancelRegister = new EventEmitter();
  registerForm:FormGroup;
  validationErrors = [];
  model:Login = new Login();

  maxDate:Date;

  loading=false;

  constructor(public bsModalRef: BsModalRef, public accountService:AccountService,
    public toastr:ToastrService, public fb:FormBuilder, public router:Router,public modalService: BsModalService,) { }


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
    this.loading=true;
    this.accountService.register(this.registerForm.value).subscribe(
      response=>
      {
        this.loading=false;
        this.bsModalRef.hide();
        this.router.navigateByUrl('/members');
      },
      error=>
      {
        this.validationErrors=error;
        console.log(this.validationErrors);
      }
      );
  }
  cancel()
  {
    this.cancelRegister.emit(false);
  }

  login()
  {
    this.loading=true;
    this.accountService.login(this.model).subscribe(
      response=>
      {
        this.loading=false;
        this.bsModalRef.hide();
        this.router.navigateByUrl('/members');
      },
      error =>
      {
        //this.bsModalRef.setClass()
      }
    );
      
  }

}
