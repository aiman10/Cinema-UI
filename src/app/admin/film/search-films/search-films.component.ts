import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Crew } from 'src/app/types/cast';
import { FilmResult, Result } from 'src/app/types/moviedatabaseresult';
import { MoviedatabaseService } from 'src/app/services/moviedatabase.service';
import { PassdataService } from 'src/app/services/passdata.service';

@Component({
  selector: 'app-add-films',
  templateUrl: './search-films.component.html',
  styleUrls: ['./search-films.component.css'],
})
export class searchFilmsComponent implements OnInit {
  result: Result | undefined;
  filmResult: FilmResult[] | undefined;
  clearYear!: number;
  imageUrl = 'https://image.tmdb.org/t/p/original';
  sortingOrder: 'asc' | 'desc' = 'asc';
  notFound = false;
  crew: Crew[] | undefined;
  movieIdAPI = 0;

  private _title: string = '';
  private _releaseYear!: number;
  constructor(
    private movieDatabase: MoviedatabaseService,
    private router: Router,
    private dataPasser: PassdataService
  ) {}

  async ngOnInit() {}

  async search() {
    if (this.title.length >= 1) {
      this.result = await this.movieDatabase.searchFilm(
        this.title,
        this.releaseYear
      );
      //console.log(this.result);
      this.filmResult = this.result.results;
      this.checkIfMoviesNotFound();
      this.title = '';
      this.releaseYear = this.clearYear;
    } else alert('Title is required');
  }

  toggleSorting() {
    this.sortingOrder = this.sortingOrder === 'asc' ? 'desc' : 'asc';
    this.sortMovies();
  }

  sortMovies() {
    if (this.filmResult) {
      this.filmResult.sort((a, b) => {
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);
        if (this.sortingOrder === 'asc') {
          return dateA.getFullYear() - dateB.getFullYear();
        } else {
          return dateB.getFullYear() - dateA.getFullYear();
        }
      });
    }
  }

  checkIfMoviesNotFound() {
    if (this.filmResult?.length == 0) {
      //console.log('No movies found');
      this.notFound = true;
    } else this.notFound = false;
  }

  addFilm(film: FilmResult) {
    /*
    const state = {
      filmSelected: true,
      title: film.title,
      releaseYear: new Date(film.release_date).getFullYear(),
      director: 'unkown',
      description: film.overview,
      rating: film.vote_average.toFixed(2),
      posterUrl: this.imageUrl + film.poster_path,
    };
    this.router.navigate(['/admin/addfilm'], {
      queryParams: { state: JSON.stringify(state) },
    });*/

    this.dataPasser.filmSelected = true;
    this.dataPasser.title = film.title;
    this.dataPasser.releaseYear = new Date(film.release_date).getFullYear();
    this.dataPasser.description = film.overview;
    this.dataPasser.rating = parseFloat(film.vote_average.toFixed(2));
    this.dataPasser.posterUrl = this.imageUrl + film.poster_path;
    this.dataPasser.movieIdAPI = film.id;
    this.getCredits(film.id);
  }

  async getCredits(id: number) {
    const directors: string[] = [];
    this.crew = (await this.movieDatabase.getCredits(id)).crew;
    if (this.crew.length > 1) {
      this.crew.forEach((crewMember) => {
        if (crewMember.job == 'Director') {
          directors.push(crewMember.name);
        }
      });
      if (directors.length > 0) {
        this.dataPasser.director = directors.join(' & '); // Join director names with ' & ' separator
        console.log(`Directors: ${this.dataPasser.director}`);
      }
    }
    this.router.navigate(['/admin/addfilm']);
  }

  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }

  public get releaseYear(): number {
    return this._releaseYear;
  }
  public set releaseYear(value: number) {
    this._releaseYear = value;
  }
}
