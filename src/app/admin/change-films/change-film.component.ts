import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFilm } from 'src/app/types/films';
import { FilmService } from 'src/app/services/film.service';
import { PassdataService } from 'src/app/services/passdata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-film',
  templateUrl: './change-film.component.html',
  styleUrls: ['./change-film.component.css'],
})
export class ChangeFilmComponent implements OnInit {
  films: IFilm[] | undefined;
  imageUrl = 'https://image.tmdb.org/t/p/original';
  showMovies = true;
  constructor(
    private service: FilmService,
    private dataPasser: PassdataService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loadMovies();
  }

  async loadMovies() {
    this.films = await this.service.getAllFilms();
  }

  toggleMovies() {
    this.showMovies = !this.showMovies;
  }

  editFilm(film: any) {
    this.dataPasser.filmSelected = true;
    this.dataPasser.filmId = film._id;
    this.dataPasser.title = film.title;
    this.dataPasser.releaseYear = film.releaseYear;
    this.dataPasser.director = film.director;
    this.dataPasser.description = film.description;
    this.dataPasser.rating = film.rating;
    this.dataPasser.posterUrl = film.posterUrl;
    this.dataPasser.movieIdAPI = film.idAPI;
    this.router.navigate(['/admin/editfilm']);
  }

  deleteFilm(film: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.service.deleteFilm(film._id);
        this.loadMovies();
        Swal.fire('Deleted!', `${film.title} has been deleted.`, 'success');
      }
    });
  }
}
