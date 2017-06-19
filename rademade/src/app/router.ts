import {Routes} from "@angular/router";
import {CalendarComponent} from "./calendar/calendar.component";
export const appRoutes: Routes = [
  { path: '**', component: CalendarComponent }
];
