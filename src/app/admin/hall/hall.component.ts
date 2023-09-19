import { Component } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { HallService } from 'src/app/services/hall.service';
import { ScreeningService } from 'src/app/services/screening.service';
import { IHall, IScreening } from 'src/app/types/screenings';
import Swal from 'sweetalert2';

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
        this.duplicateErrorAlert();
      } else {
        await this.hallService.createHall({
          hallNumber: this.hallNumber,
          capacity: this.capacity,
        });
        this.getHalls();
        this.confirmCreateAlert(this.hallNumber);
        this.hallNumber = this.emptyNumber;
        this.capacity = this.emptyNumber;
      }
    }
  }

  async deleteHall(hall: IHall) {
    //check for existing screenings
    if (this.listOfHallNumbers.includes(hall.hallNumber)) {
      this.HallScreeningErrorAlert();
    } else {
      await this.hallService.deleteHall(hall._id!.toString());
      Swal.fire(
        'Deleted!',
        `Hall ${hall.hallNumber} has been deleted.`,
        'success'
      );
      this.getHalls();
    }
  }

  confirmCreateAlert(nr: number) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `Hall ${nr} has been created`,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  HallScreeningErrorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Screening error',
      text: `There are still a screenings attached to this hall`,
    });
  }

  duplicateErrorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Duplicate error',
      text: `Hall ${this.hallNumber} has already been added`,
      //confirmButton: 'your-custom-button-class',
    });
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
