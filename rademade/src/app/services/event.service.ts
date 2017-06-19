import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Http, Response, URLSearchParams} from "@angular/http";
import {Event} from '../models/event'
import * as moment from 'moment';
import { EventRequest } from '../models/event-request';
@Injectable()
export class EventService {

  private BASE_URL = "/api/events/";

  constructor(private http: Http){}

  createEvent(event: Event): Observable<Event>{
    return this.http.post(this.BASE_URL, {event: this.parseRequestData(event)}).map( el => this.handleResponse(el));
  }

  update(event: Event): Observable<Event>{
    return this.http.put(this.BASE_URL + event.id, {event: this.parseRequestData(event)}).map( el => this.handleResponse(el));
  }

  getEvents(startDate: any, endDate: any): Observable<Array<Event>> {
    let searchParams = new URLSearchParams();
    searchParams.append('event_start_date', startDate);
    searchParams.append('event_end_date', endDate);
    return this.http.get(this.BASE_URL, {search: searchParams}).map(el => this.handleGetResponse(el.json().data.events))
  }

  destroyEvent(eventId: number): Observable<any> {
    return this.http.delete(this.BASE_URL + eventId);
  }


  private handleResponse(resp: Response): Event{
    let res: Event = new Event();
    let body = resp.json().data.event;
    res.eventStartDate = moment(body.event_start_date);
    res.eventEndDate = moment(body.event_end_date);
    res.title = body.title;
    res.comment = body.description;
    res.id = body.id;
    console.log(body);
    return res;
  }



  private parseRequestData(event: Event): EventRequest{
    return {
      title: event.title,
      description: event.comment,
      event_start_date: event.eventStartDate,
      event_end_date: event.eventEndDate
    };
  }

  private handleGetResponse(events: Array<any>){
    return events.map( el => this.parseSingleEvent(el));

  }

  private parseSingleEvent(response){
    let res: Event = new Event();
    res.eventStartDate = moment(response.event_start_date);
    res.eventEndDate = moment(response.event_end_date);
    res.title = response.title;
    res.comment = response.description;
    res.id = response.id;
    return res;
  }
}
