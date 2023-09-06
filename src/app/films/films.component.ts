import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { IFilm } from '../films';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
})
export class FilmsComponent implements OnInit {
  films: IFilm[] | undefined;

  constructor(private service: FilmService) {}

  async ngOnInit() {
    this.films = await this.service.getAllFilms();
  }
}
