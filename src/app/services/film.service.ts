import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Films, IFilm } from '../types/films';
import { IScreening } from '../types/screenings';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  constructor(private http: HttpClient) {}

  getAllFilms(): Promise<Films> {
    return lastValueFrom(this.http.get<Films>('http://localhost:3000/movies'));
  }

  getFilm(id: string): Promise<IFilm> {
    return lastValueFrom(
      this.http.get<IFilm>(`http://localhost:3000/movies/${id}`)
    );
  }
  public async createFilm(film: IFilm) {
    await lastValueFrom(
      this.http.post<IFilm>('http://localhost:3000/movies', film)
    );
    await this.getAllFilms();
  }

  public async deleteFilm(id: string) {
    await lastValueFrom(this.http.delete(`http://localhost:3000/movies/${id}`));
    await this.getAllFilms();
  }

  public async updateFilm(id: string, film: IFilm) {
    await lastValueFrom(
      this.http.put(`http://localhost:3000/movies/${id}`, film)
    );
    await this.getAllFilms();
  }

  public async addScreeningToFilm(id: string, screenings: IScreening[]) {
    await lastValueFrom(
      this.http.post<IFilm>(
        `http://localhost:3000/movies/${id}/screenings`,
        screenings
      )
    );
  }
}
