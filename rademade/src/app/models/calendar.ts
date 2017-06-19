import * as moment from "moment";
import { Event } from './event';
import Moment = moment.Moment;

export class Calendar {
  public days: Array<Day> = [];
  public times: Array<String> = [];

  constructor(currentMoment: Moment){
    currentMoment.startOf('week');
    for(let i = 0; i < 7; i++){
        this.days.push(new Day(moment(currentMoment).add(i,"d")));
    }
    for(let i = 0; i < 24; i++){
      this.times.push(`${i}: 00`)
    }
  }
}

class Day {
  public date: Moment;

  constructor(currentMoment: Moment){
    this.date = currentMoment;
  }
}


