import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../_models/password.validator';
import { forBiddenNameValidator } from '../_models/username.validator';
//import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  registerForm : FormGroup;
  constructor(public fb:FormBuilder) { }

  //reactive form - reactive-forms component

  /*using FormGroup and FormControl 
  registerForm = new FormGroup(
    {
      username : new FormControl(''),
      password : new FormControl(''),
      confirmPassword : new FormControl(''),
      address : new FormGroup(
        {
          city : new FormControl(''),
          state : new FormControl(''),
          pincode : new FormControl('')
        }
      )
    }
  )*/

 onSubmit()
 {
   console.log(this.registerForm.value);
 }

  get userName()
  {
    return this.registerForm.get('username');
  }
  get email()
  {
    return this.registerForm.get('email');
  }
  get alternateEmails() 
  {
    return this.registerForm.get('alternateEmails') as FormArray;
  }
  addAlternateEmails() //every time this method called a formcontrol is push into formarray
  {
    return this.alternateEmails.push(this.fb.control(''));
  }

  loadApiData()
  {
    this.registerForm.setValue( //must supply all the formcontrol values
      {
        username : 'selvakumar',
        password : 'sharmisk',
        confirmPassword : 'sharmisk',
        address: {
          city : 'madurai',
          state : 'tamilnadu',
          pincode : '625207'
        }
      }
    )
  }

  loadSomeApiData()
  {
    this.registerForm.patchValue( //we can pass some formcontrol values
      {
        username : 'selvakumar',
        password : 'sharmisk',
        confirmPassword : 'sharmisk',
      }
    )
  }
  
  

  ngOnInit(): void {
     //using FormBuilder
    this.registerForm = this.fb.group(
    {
      //username : ['', [Validators.required, Validators.minLength(3),forBiddenNameValidator]],
      username : ['', [Validators.required, Validators.minLength(3),forBiddenNameValidator(/password/)]],
      email : [''],
      subscribe : [false],
      password : [''],
      confirmPassword : [''],
      address : this.fb.group(
        {
          city : [''],
          state : [''],
          pincode : ['']
        }
      ),
      alternateEmails : this.fb.array([])
    }, {validator : passwordValidator});

  this.registerForm.get('subscribe').valueChanges.subscribe(
    checkedValue =>
    {
      const email = this.registerForm.get('email');
      if(checkedValue){
        email.setValidators(Validators.required);
      }
      else{
        email.clearValidators();
      }
      email.updateValueAndValidity();
    })

  }
}

  
