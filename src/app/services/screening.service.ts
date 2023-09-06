import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Screenings, IHall, Halls, IScreening } from '../screenings';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  constructor(private http: HttpClient) {}

  getScreeningsFromMovie(movieId: string) {
    return lastValueFrom(
      this.http.get<Screenings>(
        `http://localhost:3000/movies/${movieId}/screenings`
      )
    );
  }

  getScreeningById(id: string) {
    return lastValueFrom(
      this.http.get<IScreening>(`http://localhost:3000/screenings/${id}`)
    );
  }
}
