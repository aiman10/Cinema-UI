import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmService } from 'src/app/services/film.service';
import { HallService } from 'src/app/services/hall.service';
import { PassdataService } from 'src/app/services/passdata.service';
import { ScreeningService } from 'src/app/services/screening.service';
import { IScreening, IHall } from 'src/app/types/screenings';

@Component({
  selector: 'app-edit-screenings',
  templateUrl: './edit-screenings.component.html',
  styleUrls: ['./edit-screenings.component.css'],
})
export class EditScreeningsComponent implements OnInit {
  numberOfScreenings!: number;
  screeningArrays: IScreening[] = [];
  finalNumber!: number;
  halls: IHall[] = [];
  private _selectedHall!: IHall;

  constructor(
    private dataPasser: PassdataService,
    private hallService: HallService,
    private filmService: FilmService,
    private screeningService: ScreeningService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.halls = await this.hallService.getHalls();
    this.getScreeningCount(this.dataPasser.filmId);
  }

  public get selectedHall(): IHall {
    return this._selectedHall;
  }
  public set selectedHall(value: IHall) {
    this._selectedHall = value;
    //console.log(this.selectedHall);
  }

  async getScreeningCount(id: string) {
    this.screeningArrays = await this.screeningService.getScreeningsFromMovie(
      id
    );
    console.log(this.screeningArrays);
  }

  reset(Screening: IScreening) {
    Screening.price = this.finalNumber;
    Screening.type = '';
    Screening.startTime = '';
    Screening.endTime = '';
    Screening.availableSeats = this.finalNumber;
    Screening.bookedSeats = this.finalNumber;
    Screening.hallNumber = this.halls[0].hallNumber;
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
    /*
    localStorage.setItem(
      'numberOfScreenings',
      `${(this.numberOfScreenings += 1)}`
    );*/
  }

  delete(index: number) {
    this.screeningArrays.splice(index, 1);
    /*
    localStorage.setItem(
      'numberOfScreenings',
      `${(this.numberOfScreenings -= 1)}`
    );*/
  }

  async submit() {}

  back() {
    this.router.navigate(['/admin/editfilm']);
  }
}
