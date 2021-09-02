import { Component, OnInit } from '@angular/core';
import { Student } from '../_models/student';

@Component({
  selector: 'app-tdf-forms',
  templateUrl: './tdf-forms.component.html',
  styleUrls: ['./tdf-forms.component.css']
})
export class TdfFormsComponent implements OnInit {

  departments = ['ECE', 'EEE', 'IT', 'CSE', 'MECH', 'MCA', 'MBA']
  student:Student = new Student();
  courseHasError = true;

  constructor() { }

  ngOnInit(): void {
  }

  validateCourse(value)
  {
    if(value===' ') this.courseHasError=true;
    else this.courseHasError=false;
  }

  onSubmit(student)
  {
    console.log(student);
    console.log(this.student);
  }
}
