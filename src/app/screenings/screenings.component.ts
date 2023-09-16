import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreeningService } from '../services/screening.service';
import { DatePipe } from '@angular/common';
import { HallService } from '../services/hall.service';
import { FilmService } from '../services/film.service';
import { MoviedatabaseService } from '../services/moviedatabase.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Cast } from '../types/cast';
import { IFilm } from '../types/films';
import { Backdrop } from '../types/movieImage';
import { IMovieDetail } from '../types/moviedetail';
import { IScreening, IHall } from '../types/screenings';
import { ITrailer } from '../types/trailer';

@Component({
  selector: 'app-screenings',
  templateUrl: './screenings.component.html',
  styleUrls: ['./screenings.component.css'],
})
export class ScreeningsComponent implements OnInit {
  movieId: string | undefined;
  screenings: IScreening[] | undefined;
  hall!: IHall;
  halls!: IHall[];
  trailers!: ITrailer[];
  selectedTrailer!: ITrailer;
  selectedFilm!: IFilm;
  trailerURL!: SafeResourceUrl;
  cast!: Cast[];
  actors: string[] = [];
  movieDetail!: IMovieDetail;
  movieImages: Backdrop[] = [];
  currentImageIndex = 0;
  imageUrls: string[] = [];

  private _date!: string;
  currentIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private service: ScreeningService,
    private hallService: HallService,
    private movieService: FilmService,
    private movieDatabase: MoviedatabaseService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.getCurrentTime();
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.movieId = params.get('id') ?? undefined;
      if (this.movieId !== undefined) {
        this.getScreenings();
        this.selectedFilm = await this.movieService.getFilm(this.movieId);
        this.getUrl(this.selectedFilm.idAPI);
        this.getCredits(this.selectedFilm.idAPI);
        this.getMovieDetail(this.selectedFilm.idAPI);
        this.getImages(this.selectedFilm.idAPI);
      }
    });
  }

  async getScreenings() {
    if (this.movieId !== undefined) {
      this.screenings = (
        await this.service.getScreeningsFromMovie(this.movieId)
      ).filter((screening: IScreening) =>
        screening.startTime.includes(this.date)
      );
      /*
      for (let screening of this.screenings) {
        screening.hallNumber = await this.getHallNumberbyId(screening.hallId);
      }*/
    }
  }

  async getMovieDetail(id: number) {
    this.movieDetail = await this.movieDatabase.getDetail(id);
    //console.log(this.movieDetail);
  }

  async getUrl(id: number) {
    this.trailers = (await this.movieDatabase.getTrailer(id)).results;
    this.trailers.forEach((trailer) => {
      if ((trailer.name = 'Official Trailer')) {
        this.selectedTrailer = trailer;
      }
    });
    this.trailerURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.selectedTrailer.key}`
    );

    console.log(this.trailerURL);
  }

  async getCredits(id: number) {
    this.cast = (await this.movieDatabase.getCredits(id)).cast;
    if (this.cast.length > 1) {
      for (let i = 0; i < Math.min(6, this.cast.length); i++) {
        this.actors.push(this.cast[i].name);
      }
    }
  }

  async getImages(id: number) {
    this.movieImages = (await this.movieDatabase.getImages(id)).backdrops;
    this.movieImages.forEach((image) => {
      if (image.vote_average >= 4) {
        this.imageUrls.push(image.file_path);
      }
    });
  }

  async getHallNumberbyId(id: string) {
    const hall = await this.hallService.getHallById(id);
    //console.log(this.hall.hallNumber);
    return hall.hallNumber;
  }

  formatTime(dateTime: string): string {
    const formattedDate = new Date(dateTime);
    const hours = formattedDate.getHours().toString().padStart(2, '0');
    const minutes = formattedDate.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  getCurrentTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    this.date = `${year}-${month}-${day}`;
  }

  formatRuntime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0 && remainingMinutes > 0) {
      return `${hours}H ${remainingMinutes}M`;
    } else if (hours > 0) {
      return `${hours}H`;
    } else {
      return `${remainingMinutes}M`;
    }
  }

  formatDate(inputDate: string) {
    return new Date(inputDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.imageUrls.length) %
      this.movieImages.length;
  }

  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.imageUrls.length;
  }

  //"'https://image.tmdb.org/t/p/original' + image.file_path"
  get imageUrl(): string {
    return (
      'https://image.tmdb.org/t/p/original' +
      this.imageUrls[this.currentImageIndex]
    );
  }

  public get date(): string {
    return this._date;
  }
  public set date(value: string) {
    this._date = value;
  }
}
