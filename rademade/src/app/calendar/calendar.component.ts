import { Component, OnInit } from '@angular/core';
import {Calendar} from "../models/calendar";
import { Event } from "../models/event"
import {ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import * as moment from 'moment';
import Moment = moment.Moment;
import {ModalService} from "../services/modal.service";
import {EventService} from "../services/event.service";

const HOUR_LENGTH = 27;
const CORRECTIVE_LENGTH = 10;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentYear: Moment;
  currentDate: Moment = moment().startOf("day");
  times: Array<String> = [];
  calendar: Calendar;
  events: Array<Event> = [];

  editableEvent: Event = new Event();
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private modalService: ModalService,
              private eventService: EventService) {}

  ngOnInit() {
    console.log("INIT");
    this.navigationListener();
    let startTime = moment().startOf("day").add(-1,"hours");
    for( let i = 0; i < 24; i++){
      this.times.push(startTime.add(1,"hours").format("hh:mm a"))
    }
  }

  getHeight(event: Event): any{
    return (event.eventEndDate.diff(event.eventStartDate, 'hours') * HOUR_LENGTH).toString()  + 'px'
  }

  getMarging(event: Event): any {
    let startTime = moment(event.eventStartDate).startOf("day");
    return event.eventStartDate.diff(startTime, 'hours') * HOUR_LENGTH + CORRECTIVE_LENGTH + 'px'
  }

  navigationListener(){
    this.activatedRoute.queryParams.subscribe( data => {
        if(data['date'] == undefined) {
          this.currentYear = moment(data['date']).startOf("day");
          this.nextWeek(this.currentYear)
        }
        else {
          this.currentYear = moment(data['date']);
          this.calendar = new Calendar(this.currentYear);
          this.eventService.getEvents(this.calendar.days[0].date, this.calendar.days[6].date).subscribe( el => this.events = el);
        }

      }
    );
  }

  nextWeek(date: Moment){
    let navigationOptions: NavigationExtras = { queryParams: {date: date.startOf("day").toISOString() } };
    this.router.navigate(['/'], navigationOptions);
  }

  createEvent(date: Moment) {
    this.editableEvent = new Event();
    this.editableEvent.eventStartDate = date;
    this.modalService.activateModal(this.editableEvent);
  }

  editEvent(domEvent, event){
    domEvent.stopPropagation();
    this.editableEvent = event;
    this.modalService.activateModal(event);
  }

  updateEvent(event: Event){
    console.log("CHECK",event);
    let index = this.events.map( el => el.id).indexOf(event.id);
      if(index != -1) {
        this.events[index] = event
      }
      else
        this.events.push(event);
  }

  deleteHandler(id: number){
    let index = this.events.map( el => el.id).indexOf(id);
    if(index != -1) {
     this.events.splice(index,1)
    }
  }

}
