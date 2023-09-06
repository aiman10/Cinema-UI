import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IHall, IScreening } from 'src/app/screenings';
import { FilmService } from 'src/app/services/film.service';
import { HallService } from 'src/app/services/hall.service';
import { PassdataService } from 'src/app/services/passdata.service';

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
  private _selectedHall!: IHall;

  constructor(
    private dataPasser: PassdataService,
    private filmService: FilmService,
    private hallService: HallService,
    private router: Router
  ) {
    this.numberOfScreenings = this.dataPasser.screeningNumbers;
    for (let i = 0; i < this.numberOfScreenings; i++) {
      const emptyScreening: IScreening = {
        hallNumber: this.finalNumber,
        price: this.finalNumber,
        type: '',
        startTime: '',
        endTime: '',
        availableSeats: this.finalNumber,
        bookedSeats: this.finalNumber,
        //movieId: '',
      };
      this.screeningArrays.push(emptyScreening);
    }
  }

  async ngOnInit() {
    this.halls = await this.hallService.getHalls();
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
    this.router.navigate(['/admin']);
    this.dataPasser.clearFilm();
  }

  isScreeningValid(screening: IScreening): boolean {
    for (const prop in screening) {
      if (screening.hasOwnProperty(prop)) {
        const value = screening[prop as keyof IScreening];
        console.log(value);
        if (!value && value !== 0) {
          return false;
        }
      }
    }
    return true;
  }

  public get selectedHall(): IHall {
    return this._selectedHall;
  }
  public set selectedHall(value: IHall) {
    this._selectedHall = value;
    console.log(this.selectedHall);
  }
}
