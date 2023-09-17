import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmService } from 'src/app/services/film.service';
import { PassdataService } from 'src/app/services/passdata.service';
import { ScreeningService } from 'src/app/services/screening.service';
import { IScreening } from 'src/app/types/screenings';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css'],
})
export class EditFilmComponent implements OnInit {
  numScreenings!: number;
  finalNumber: number | undefined;

  emptyScreenigs: IScreening[] = [];
  loading: boolean = false;
  idAPI!: number;
  private _screeningsCount: number = 0;

  private _title = '';
  private _releaseYear!: number;
  private _director = '';
  private _description = '';
  private _rating!: number;
  private _posterUrl = '';
  private _filmId = '';

  errorMessage!: string;
  constructor(
    private dataPasser: PassdataService,
    private filmService: FilmService,
    private screeningService: ScreeningService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.dataPasser.filmSelected) {
      this.filmId = this.dataPasser.filmId;
      this.title = this.dataPasser.title;
      this.releaseYear = this.dataPasser.releaseYear;
      this.director = this.dataPasser.director;
      this.description = this.dataPasser.description;
      this.rating = this.dataPasser.rating;
      this.posterUrl = this.dataPasser.posterUrl;
      this.idAPI = this.dataPasser.movieIdAPI;
      this.getScreeningCount(this.filmId);
    }
  }

  async getScreeningCount(id: string) {
    this.screeningsCount = (
      await this.screeningService.getScreeningsFromMovie(id)
    ).length;
    console.log(this.screeningsCount);
  }

  editScreenings() {
    this.router.navigate(['/admin/editscreening']);
    this.updateFilm();
  }

  async updateFilm() {
    await this.filmService.updateFilm(this.filmId, {
      title: this.title,
      releaseYear: this.releaseYear,
      director: this.director,
      description: this.description,
      rating: this.rating,
      posterUrl: this.posterUrl,
      screenings: this.emptyScreenigs,
      idAPI: this.idAPI,
    });
  }

  async update() {
    this.updateFilm();
    this.dataPasser.clearFilm();
    this.router.navigate(['/admin/film']);
  }

  back() {
    localStorage.setItem('numberOfScreenings', `${0}`);
    this.dataPasser.clearFilm();
    this.router.navigate(['/admin/film']);
  }

  addScreenings() {
    localStorage.setItem('numberOfScreenings', `${0}`);
    this.router.navigate(['/admin/editfilm/addscreening']);
  }

  public get title() {
    return this._title;
  }
  public set title(value) {
    this._title = value;
  }

  public get director() {
    return this._director;
  }
  public set director(value) {
    this._director = value;
  }
  public get description() {
    return this._description;
  }
  public set description(value) {
    this._description = value;
  }

  public get posterUrl() {
    return this._posterUrl;
  }
  public set posterUrl(value) {
    this._posterUrl = value;
  }

  public get rating(): number {
    return this._rating;
  }
  public set rating(value: number) {
    this._rating = value;
  }
  public get releaseYear(): number {
    return this._releaseYear;
  }
  public set releaseYear(value: number) {
    this._releaseYear = value;
  }

  public get filmId() {
    return this._filmId;
  }
  public set filmId(value) {
    this._filmId = value;
  }
  public get screeningsCount(): number {
    return this._screeningsCount;
  }
  public set screeningsCount(value: number) {
    this._screeningsCount = value;
  }
}
