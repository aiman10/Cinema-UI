import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { ITicket } from 'src/app/types/tickets';
import { DatePipe } from '@angular/common';
import { ScreeningService } from 'src/app/services/screening.service';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  tickets: ITicket[] = [];
  movieName = '';
  isValid = false;
  constructor(
    private ticketService: TicketService,
    private datePipe: DatePipe,
    private screeningServive: ScreeningService,
    private filmService: FilmService
  ) {}
  async ngOnInit() {
    this.tickets = await this.ticketService.getTickets();
  }

  checkValidTicket(ticket: ITicket) {
    const currentDate = new Date();
    const screeningDate = new Date(ticket.screeningDate);

    return screeningDate >= currentDate;
  }

  /*
  async getMovieName(screeningId: string) {
    const screening = await this.screeningServive.getScreeningById(screeningId);
    if (screening.movieId) {
      return (await this.filmService.getFilm(screening.movieId)).title;
    }
    return 'Movie Not Found';
  }
  */
  formatDate(dateString: string) {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'MMMM d, y, HH:mm');
  }
}
