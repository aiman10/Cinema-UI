import { Component } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { HallService } from 'src/app/services/hall.service';
import { ScreeningService } from 'src/app/services/screening.service';
import { IHall, IScreening } from 'src/app/types/screenings';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.css'],
})
export class HallComponent {
  private _hallNumber!: number;
  private _capacity!: number;
  emptyNumber!: number;
  halls: IHall[] = [];
  hallNumbers: number[] = [];
  screenings: IScreening[] | undefined;
  listOfHallNumbers: number[] = [];
  constructor(
    private hallService: HallService,
    private screeningService: ScreeningService
  ) {}

  ngOnInit(): void {
    this.getScreenings();
    this.getHalls();
  }

  async getScreenings() {
    this.screenings = await this.screeningService.getAllScreenings();
    this.screenings.forEach((screening) => {
      this.listOfHallNumbers.push(screening.hallNumber);
    });
    console.log(this.listOfHallNumbers);
  }

  async getHalls() {
    this.halls = await this.hallService.getHalls();
    this.halls.forEach((hall) => {
      this.hallNumbers.push(hall.hallNumber);
    });
  }

  back() {}
  async addHall() {
    if (this.hallNumber == undefined || this.capacity == undefined) {
      //TODO pop up message
      alert('leeg');
    } else {
      if (this.hallNumbers.includes(this.hallNumber)) {
        //TODO pop up message
        alert('Already Exists');
      } else {
        await this.hallService.createHall({
          hallNumber: this.hallNumber,
          capacity: this.capacity,
        });
        this.getHalls();
        this.hallNumber = this.emptyNumber;
        this.capacity = this.emptyNumber;
      }
    }
  }

  deleteHall(hall: IHall) {
    //check for existing screenings
    if (this.listOfHallNumbers.includes(hall.hallNumber)) {
      alert('Exists');
    } else {
      //TODO delete
    }
  }

  public get hallNumber(): number {
    return this._hallNumber;
  }
  public set hallNumber(value: number) {
    this._hallNumber = value;
  }
  public get capacity(): number {
    return this._capacity;
  }
  public set capacity(value: number) {
    this._capacity = value;
  }
}
