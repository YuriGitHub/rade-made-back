import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarDayComponent } from './calendar/calendar-day/calendar-day.component';
import { CalendarEventComponent } from './calendar/calendar-event/calendar-event.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import {RouterModule} from "@angular/router";
import {appRoutes} from "./router";
import {ModalService} from "./services/modal.service";
import {EventService} from "./services/event.service";

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarDayComponent,
    CalendarEventComponent,
    ModalWindowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [ModalService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
