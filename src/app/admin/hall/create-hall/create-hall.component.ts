import { Component, OnInit } from '@angular/core';
import { HallService } from 'src/app/services/hall.service';
import { IHall } from 'src/app/types/screenings';

@Component({
  selector: 'app-create-hall',
  templateUrl: './create-hall.component.html',
  styleUrls: ['./create-hall.component.css'],
})
export class CreateHallComponent implements OnInit {
  private _hallNumber!: number;
  private _capacity!: number;
  halls: IHall[] = [];

  constructor(private hallService: HallService) {}

  async ngOnInit() {
    this.halls = await this.hallService.getHalls();
  }

  back() {}
  addHall() {}

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
