import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ModalService} from "../services/modal.service";
import { Event } from "../models/event";
import {FormGroup, FormControl} from "@angular/forms";
import * as moment from "moment";
import Moment = moment.Moment;
import {EventService} from "../services/event.service";

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {

  activeModal = false;
  editForm;
  timesForSelect: Array<Moment> = [];
  editableEvent: Event = new Event();

  @Output() newEventAction: EventEmitter<Event> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter();

  constructor(private modalService: ModalService, private eventService: EventService) {
    this.buildForm()
  }

  ngOnInit() {
    this.modalService.getModalActionObs().subscribe(
      data => {
        this.activeModal = data.active;
          if(this.activeModal) {
            this.editableEvent = data.event;
            this.buildForm();
            this.createTimesForSelect()
          }
      }
    );
  }

  createTimesForSelect(){
    let createTimes = moment(this.editableEvent.eventStartDate).startOf("day");
    this.timesForSelect = [];
    this.timesForSelect.push(moment(createTimes));
    for( let i = 0; i < 23; i++){
      this.timesForSelect.push(moment(createTimes.add(1,"h")))
    }
  }

  buildForm(){
    this.editForm = new FormGroup({
      id: new FormControl(this.editableEvent.id),
      eventStartDate: new FormControl(this.editableEvent.eventStartDate),
      eventEndDate: new FormControl(this.editableEvent.eventEndDate),
      title: new FormControl(this.editableEvent.title),
      comment: new FormControl(this.editableEvent.comment)
    });

  }

  submitAction(event){
    event.preventDefault();
    this.modalService.hideModal();
    let newEvent = this.editForm.value as Event;
    newEvent.eventStartDate = moment(newEvent.eventStartDate);
    newEvent.eventEndDate = moment(newEvent.eventEndDate);
    if(newEvent.id == null)
      this.eventService.createEvent(newEvent).subscribe( data => this.newEventAction.emit(data));
    else
      this.eventService.update(newEvent).subscribe( data => this.newEventAction.emit(data));
  }

  closeAction(){
    this.modalService.hideModal();
  }

  deleteHandler(){
    this.eventService.destroyEvent(this.editableEvent.id).subscribe( data => console.log(data));
    this.deleteEvent.emit(this.editableEvent.id);
    this.modalService.hideModal();
  }

}
