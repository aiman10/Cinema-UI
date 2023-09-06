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
import { searchFilmsComponent } from './admin/search-films/search-films.component';
import { CreateFilmComponent } from './admin/create-film/create-film.component';
import { ChangeFilmComponent } from './admin/change-films/change-film.component';
import { EditFilmComponent } from './admin/edit-film/edit-film.component';
import { CreateScreeningsComponent } from './admin/create-screenings/create-screenings.component';
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSlideToggleModule,
    FormsModule,
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
          path: 'admin',
          component: AdminComponent,
        },
        {
          path: 'admin/addfilm',
          component: CreateFilmComponent,
        },
        {
          path: 'admin/editFilm',
          component: EditFilmComponent,
        },
        {
          path: 'admin/addscreening',
          component: CreateScreeningsComponent,
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
