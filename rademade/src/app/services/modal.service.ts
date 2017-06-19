import { Injectable } from '@angular/core';
import {Subject, BehaviorSubject, Observable} from "rxjs";
import {Event} from "../models/event"
@Injectable()
export class ModalService {

  private modalAction: Subject<ModalType> = new Subject();

  constructor() {}

  activateModal(event:Event){
    let state: ModalType = {active: true, event: event};
    this.modalAction.next(state);
  }

  hideModal(){
    this.modalAction.next({active: false});
  }

  getModalActionObs(): Observable<ModalType>{
    return this.modalAction.asObservable()
  }
}

interface ModalType {
  active: boolean;
  event?: Event;
}
