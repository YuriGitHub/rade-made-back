import * as moment from "moment";
import Moment = moment.Moment;

export class Event {
  public id:number;
  public eventStartDate: Moment;
  public eventEndDate: Moment;
  public title: String;
  public comment: String;

  static buildEmptyField(): Event {
    let event: Event = new Event();
    event.title = "";
    event.eventStartDate = moment();
    event.eventEndDate = moment();
    event.comment = "";
    return event;
  }

}
