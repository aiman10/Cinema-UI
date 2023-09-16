import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IHall, Halls } from '../types/screenings';

@Injectable({
  providedIn: 'root',
})
export class HallService {
  constructor(private http: HttpClient) {}

  getHallById(hallId: string) {
    return lastValueFrom(
      this.http.get<IHall>(`http://localhost:3000/halls/${hallId}`)
    );
  }

  getHalls() {
    return lastValueFrom(this.http.get<Halls>(`http://localhost:3000/halls`));
  }
}
