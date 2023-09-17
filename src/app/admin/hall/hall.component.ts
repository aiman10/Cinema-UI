import { Component } from '@angular/core';
import { HallService } from 'src/app/services/hall.service';
import { IHall } from 'src/app/types/screenings';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.css'],
})
export class HallComponent {
  halls: IHall[] = [];

  constructor(private hallService: HallService) {}

  async ngOnInit() {
    this.halls = await this.hallService.getHalls();
  }
}
