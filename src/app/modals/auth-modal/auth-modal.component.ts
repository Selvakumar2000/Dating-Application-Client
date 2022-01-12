import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
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

  constructor(public bsModalRef: BsModalRef, public accountService:AccountService,
    public toastr:ToastrService, public fb:FormBuilder, public router:Router,public modalService: BsModalService,) { }


  ngOnInit(): void {
    console.log('selvaaa');
    this.initializeForm();
    this.maxDate=new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
    //don't allow any selection of dates less than 18years ago
  }

  //password show/hidden icon
  hide: boolean = true;

  myFunction() {
    this.hide = !this.hide;
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
        password:['',[  Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(12),
                        Validators.pattern(/(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{6,13}/),
                      ]
                  ],
        confirmPassword:['',[Validators.required,this.matchValues('password')]]
      })
      this.registerForm.controls.password.valueChanges.subscribe(() => {
        this.registerForm.controls.confirmPassword.updateValueAndValidity();
      })
  }

  //check password and confirmpassword fields are match
  matchValues(matchTo:string):ValidatorFn
  { //all form control are derived from abstract control
    return (control:AbstractControl) =>
    {
      return control?.value==control?.parent?.controls[matchTo].value?null:{misMatching:true};
    }
  }

  register()
  {
    this.accountService.register(this.registerForm.value).subscribe(
      response=>
      {
        this.bsModalRef.hide();
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

  login()
  {
    this.accountService.login(this.model).subscribe(
      response=>
      {
        this.bsModalRef.hide();
        this.router.navigateByUrl('/members');
      },
      error =>
      {
        
      }
    );     
  }

  openSignInModel()
  {
    this.bsModalRef.hide();
    const initialState: ModalOptions = {
      backdrop:'static',
      keyboard:false,
      initialState: {
        formType:'registerForm',
        title: 'SIGN UP',
      }
    };
    this.bsModalRef = this.modalService.show(AuthModalComponent, initialState);
    this.bsModalRef.content.okBtnName = 'REGISTER';
    this.bsModalRef.content.cancelBtnName = 'CANCEL';
  }

}
