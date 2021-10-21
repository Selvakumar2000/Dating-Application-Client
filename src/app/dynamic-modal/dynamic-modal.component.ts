import { Component, OnInit } from '@angular/core';
import { BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.css']
})
export class DynamicModalComponent implements OnInit {

  title:any;
  list:[]=[];
  okBtnName:any;
  closeBtnName:any;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  submit()
  {
    console.log('selva');
  }

}
