import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cast, Crew } from 'src/app/types/cast';
import { IScreening } from 'src/app/types/screenings';
import { FilmService } from 'src/app/services/film.service';
import { MoviedatabaseService } from 'src/app/services/moviedatabase.service';
import { PassdataService } from 'src/app/services/passdata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-film',
  templateUrl: './create-film.component.html',
  styleUrls: ['./create-film.component.css'],
})
export class CreateFilmComponent implements OnInit {
  numScreenings!: number;
  finalNumber: number | undefined;
  emptyScreenigs: IScreening[] = [];
  loading: boolean = false;
  crew: Crew[] | undefined;
  movieIdAPI = 0;
  private _title = '';
  private _releaseYear!: number;
  private _director = '';
  private _description = '';
  private _rating!: number;
  private _posterUrl = '';
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmService: FilmService,
    private dataPasser: PassdataService,
    private movieDataBase: MoviedatabaseService
  ) {}

  ngOnInit(): void {
    if (this.dataPasser.filmSelected) {
      this.title = this.dataPasser.title;
      this.releaseYear = this.dataPasser.releaseYear;
      this.director = this.dataPasser.director;
      this.description = this.dataPasser.description;
      this.rating = this.dataPasser.rating;
      this.posterUrl = this.dataPasser.posterUrl;
      this.movieIdAPI = this.dataPasser.movieIdAPI;
    }
    const storedValue = localStorage.getItem('numberOfScreenings');
    if (storedValue && parseInt(storedValue, 10) > 0) {
      this.numScreenings = parseInt(storedValue, 10);
    }
  }

  async addFilm() {
    if (this.title.length > 1) {
      try {
        await this.filmService.createFilm({
          title: this.title,
          releaseYear: this.releaseYear,
          director: this.director,
          description: this.description,
          rating: this.rating * 1,
          posterUrl: this.posterUrl,
          screenings: this.emptyScreenigs,
          idAPI: this.movieIdAPI,
        });
        this.confirmCreateAlert(this.title);
        this.router.navigate(['/admin/film']);
        this.dataPasser.clearFilm();
      } catch (error) {
        if (error instanceof HttpErrorResponse && error.status === 409) {
          this.duplicateErrorAlert(this.title);
        } else {
          // Other errors
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      }
    } else {
      this.emptyFilmErrorAlert();
    }
  }

  back() {
    this.dataPasser.clearFilm();
    this.router.navigate(['/admin/film']);
  }

  confirmCreateAlert(title: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${title} has been created`,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  emptyFilmErrorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Empty error',
      text: `Title can't be empty`,
    });
  }

  duplicateErrorAlert(film: string) {
    Swal.fire({
      icon: 'error',
      title: 'Duplicate error',
      text: `${film} has already been added`,
      //confirmButton: 'your-custom-button-class',
    });
  }

  addScreenings() {
    localStorage.setItem('numberOfScreenings', `${this.numScreenings}`);
    this.router.navigate(['/admin/addscreening']);
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
}

/*
  async addFilm() {
    try {
    this.loading = true;
    await this.filmService.createFilm({
      title: this.title,
      releaseYear: this.releaseYear,
      director: this.director,
      description: this.description,
      rating: this.rating * 1,
      posterUrl: this.posterUrl,
      screenings: this.emptyScreenigs,
    });

    // Simulate some delay (remove this in production)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    this.router.navigate(['/films']);
    } finally {
    this.loading = false;
    }
  }*/
