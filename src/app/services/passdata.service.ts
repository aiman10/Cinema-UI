import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PassdataService {
  finalNumber!: number;

  private _filmSelected = false;
  private _filmId = '';
  private _title = '';
  private _releaseYear!: number;
  private _director = '';
  private _description = '';
  private _rating!: number;
  private _posterUrl = '';
  private _movieIdAPI!: number;
  private _screeningNumbers!: number;

  constructor() {}

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

  public get filmSelected() {
    return this._filmSelected;
  }
  public set filmSelected(value) {
    this._filmSelected = value;
  }

  public get filmId() {
    return this._filmId;
  }
  public set filmId(value) {
    this._filmId = value;
  }
  public get movieIdAPI(): number {
    return this._movieIdAPI;
  }
  public set movieIdAPI(value: number) {
    this._movieIdAPI = value;
  }

  public get screeningNumbers(): number {
    return this._screeningNumbers;
  }
  public set screeningNumbers(value: number) {
    this._screeningNumbers = value;
  }

  clearFilm() {
    this.title = '';
    this.releaseYear = this.finalNumber;
    this.director = '';
    this.description = '';
    this.rating = this.finalNumber;
    this.posterUrl = '';
    this.filmId = '';
    this.filmSelected = false;
    this.movieIdAPI = this.finalNumber;
    this.screeningNumbers = this.finalNumber;
  }
}
