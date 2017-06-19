import * as moment from 'moment';
import Moment = moment.Moment;
export  interface EventRequest {
  title:String;
  description:String;
  event_start_date: Moment;
  event_end_date:Moment;
  id?:number;

}
