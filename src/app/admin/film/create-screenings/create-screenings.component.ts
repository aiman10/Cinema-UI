import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FilmService } from 'src/app/services/film.service';
import { HallService } from 'src/app/services/hall.service';
import { MoviedatabaseService } from 'src/app/services/moviedatabase.service';
import { PassdataService } from 'src/app/services/passdata.service';
import { IMovieDetail } from 'src/app/types/moviedetail';
import { IScreening, IHall } from 'src/app/types/screenings';

@Component({
  selector: 'app-create-screenings',
  templateUrl: './create-screenings.component.html',
  styleUrls: ['./create-screenings.component.css'],
})
export class CreateScreeningsComponent implements OnInit {
  numberOfScreenings: number = 0;
  screeningArrays: IScreening[] = [];
  finalNumber!: number;
  halls: IHall[] = [];
  movieDetail!: IMovieDetail;
  private _selectedHall!: IHall;

  constructor(
    private dataPasser: PassdataService,
    private filmService: FilmService,
    private movieDatabase: MoviedatabaseService,
    private hallService: HallService,
    private router: Router
  ) {
    //this.numberOfScreenings = this.dataPasser.screeningNumbers;
    const storedValue = localStorage.getItem('numberOfScreenings');
    if (storedValue) this.numberOfScreenings = parseInt(storedValue, 10);
    console.log(this.numberOfScreenings);
    for (let i = 0; i < this.numberOfScreenings; i++) {
      const emptyScreening: IScreening = {
        hallNumber: this.finalNumber,
        price: this.finalNumber,
        type: '',
        startTime: '',
        endTime: '',
        availableSeats: this.finalNumber,
        bookedSeats: this.finalNumber,
      };
      this.screeningArrays.push(emptyScreening);
    }
  }
  async ngOnInit() {
    this.halls = await this.hallService.getHalls();
    this.getMovieDetail(this.dataPasser.movieIdAPI);
  }

  async getMovieDetail(id: number) {
    this.movieDetail = await this.movieDatabase.getDetail(id);
    console.log(this.movieDetail.runtime);
  }

  reset(Screening: IScreening) {
    Screening.price = this.finalNumber;
    Screening.type = '';
    Screening.startTime = '';
    Screening.endTime = '';
    Screening.availableSeats = this.finalNumber;
    Screening.bookedSeats = this.finalNumber;
  }

  onHallChange(event: any) {
    if (event.target != null) {
      console.log(event.target.value);
    }
  }

  async submit() {
    console.log(this.dataPasser.filmId);
    console.log(this.screeningArrays);

    await this.filmService.createFilm({
      title: this.dataPasser.title,
      releaseYear: this.dataPasser.releaseYear,
      director: this.dataPasser.director,
      description: this.dataPasser.description,
      rating: this.dataPasser.rating * 1,
      posterUrl: this.dataPasser.posterUrl,
      screenings: this.screeningArrays,
      idAPI: this.dataPasser.movieIdAPI,
    });

    localStorage.setItem('numberOfScreenings', `${0}`);
    this.dataPasser.clearFilm();
    this.router.navigate(['/admin']);
  }

  delete(index: number) {
    this.screeningArrays.splice(index, 1);
    localStorage.setItem(
      'numberOfScreenings',
      `${(this.numberOfScreenings -= 1)}`
    );
  }

  add() {
    const emptyScreening: IScreening = {
      hallNumber: this.finalNumber,
      price: this.finalNumber,
      type: '',
      startTime: '',
      endTime: '',
      availableSeats: this.finalNumber,
      bookedSeats: this.finalNumber,
    };
    this.screeningArrays.push(emptyScreening);
    localStorage.setItem(
      'numberOfScreenings',
      `${(this.numberOfScreenings += 1)}`
    );
  }

  back() {
    this.router.navigate(['/admin/addfilm']);
  }

  public get selectedHall(): IHall {
    return this._selectedHall;
  }
  public set selectedHall(value: IHall) {
    this._selectedHall = value;
    //console.log(this.selectedHall);
  }

  updateEndTime(Screening: IScreening) {
    // Assuming movieDetail.runtime is a number representing minutes
    const startTime = new Date(Screening.startTime).getTime(); // Convert to milliseconds
    const runtime = this.movieDetail.runtime * 60 * 1000; // Convert runtime to milliseconds
    const endTime = new Date(startTime + runtime).toISOString().slice(0, -1); // Convert back to ISO format
    Screening.endTime = endTime;
    console.log('Start :' + Screening.startTime);
    console.log('End: ' + endTime);
  }
}

// (ngModelChange)="updateEndTime(Screening)"

// [disabled]="true"
