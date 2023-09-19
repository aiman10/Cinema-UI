import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FilmsComponent } from './films/films.component';
import { ScreeningsComponent } from './screenings/screenings.component';
import { DatePipe } from '@angular/common';
import { TicketbookingComponent } from './ticketbooking/ticketbooking.component';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { AdminComponent } from './admin/admin.component';
import { searchFilmsComponent } from './admin/film/search-films/search-films.component';
import { CreateFilmComponent } from './admin/film/create-film/create-film.component';
import { ChangeFilmComponent } from './admin/film/change-films/change-film.component';
import { EditFilmComponent } from './admin/film/edit-film/edit-film.component';
import { CreateScreeningsComponent } from './admin/film/create-screenings/create-screenings.component';
import { EditScreeningsComponent } from './admin/film/edit-screenings/edit-screenings.component';
import { AddScreeningsTofilmComponent } from './admin/film/edit-film/add-screenings-tofilm/add-screenings-tofilm.component';
import { HallComponent } from './admin/hall/hall.component';
import { FilmComponent } from './admin/film/film.component';
import { QRCodeModule } from 'angularx-qrcode';
import { TicketComponent } from './admin/ticket/ticket.component';
//import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FilmsComponent,
    ScreeningsComponent,
    TicketbookingComponent,
    BookingConfirmationComponent,
    AdminComponent,
    searchFilmsComponent,
    CreateFilmComponent,
    ChangeFilmComponent,
    EditFilmComponent,
    CreateScreeningsComponent,
    EditScreeningsComponent,
    AddScreeningsTofilmComponent,
    HallComponent,
    FilmComponent,
    TicketComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSlideToggleModule,
    FormsModule,
    QRCodeModule,
    //SweetAlert2Module.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: 'films',
          component: FilmsComponent,
        },
        {
          path: 'films/:id/screenings',
          component: ScreeningsComponent,
        },
        {
          path: 'book/:id',
          component: TicketbookingComponent,
        },
        {
          path: 'confirmation',
          component: BookingConfirmationComponent,
        },
        {
          path: 'hall',
          component: HallComponent,
        },
        {
          path: 'admin/addfilm',
          component: CreateFilmComponent,
        },
        {
          path: 'admin/editfilm',
          component: EditFilmComponent,
        },
        {
          path: 'admin/addscreening',
          component: CreateScreeningsComponent,
        },
        {
          path: 'admin/editscreening',
          component: EditScreeningsComponent,
        },
        {
          path: 'admin/editfilm/addscreening',
          component: AddScreeningsTofilmComponent,
        },
        {
          path: 'admin/film',
          component: FilmComponent,
        },
        {
          path: 'admin/ticket',
          component: TicketComponent,
        },
        {
          path: '',
          redirectTo: 'films',
          pathMatch: 'full',
        },
      ],
      {
        useHash: true,
      }
    ),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
