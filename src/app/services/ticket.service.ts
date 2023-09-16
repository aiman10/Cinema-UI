import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import { Tickets, ITicket } from '../types/tickets';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  public async getTickets(): Promise<Tickets> {
    return lastValueFrom(
      this.http.get<Tickets>('http://localhost:3000/tickets')
    );
  }

  public async createTicket(ticket: ITicket) {
    await lastValueFrom(
      this.http.post<ITicket>('http://localhost:3000/tickets', ticket)
    );
  }
}
