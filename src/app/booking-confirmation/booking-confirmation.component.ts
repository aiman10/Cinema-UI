import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HallService } from '../services/hall.service';
import { ScreeningService } from '../services/screening.service';
import { FilmService } from '../services/film.service';
import { IFilm } from '../types/films';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css'],
})
export class BookingConfirmationComponent implements OnInit {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  totalPrice: number | undefined;
  ticketAmount: number | undefined;
  filmId!: string;
  screeningId!: string;
  hallNumber!: number;
  movieName!: string;
  film!: IFilm;
  url = '';
  constructor(
    private route: ActivatedRoute,
    private screeningService: ScreeningService,
    private filmService: FilmService
  ) {}

  async ngOnInit() {
    const navigationState = this.route.snapshot.queryParams?.['state'];

    if (navigationState) {
      const state = JSON.parse(navigationState);
      this.name = state.name;
      this.email = state.email;
      this.phone = state.phone;
      this.filmId = state.filmId;
      this.totalPrice = state.totalPrice;
      this.ticketAmount = state.ticketAmount;
      this.screeningId = state.screeningId;
    }
    this.hallNumber = (
      await this.screeningService.getScreeningById(this.screeningId)
    ).hallNumber;
    this.film = await this.filmService.getFilm(this.filmId);

    this.url = this.film.posterUrl;
  }
}
