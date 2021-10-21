import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DynamicModalComponent } from '../dynamic-modal/dynamic-modal.component';

@Component({
  selector: 'app-dynamic-text',
  templateUrl: './dynamic-text.component.html',
  styleUrls: ['./dynamic-text.component.css']
})
export class DynamicTextComponent implements OnInit {

  username;
  
  bsModalRef?: BsModalRef;
  constructor(private modalService: BsModalService) { }

  size:any;

  ngOnInit(): void {
  }

  openModalWithComponent() {
    console.log(this.size);
    const initialState: ModalOptions = {
      backdrop:'static',
      initialState: {
        list: Array(parseInt(this.size)),
        title: 'Modal with component',
      }
    };
    this.bsModalRef = this.modalService.show(DynamicModalComponent, initialState);
    this.bsModalRef.content.okBtnName = 'Submit';
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
