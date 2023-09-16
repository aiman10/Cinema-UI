import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmService } from 'src/app/services/film.service';
import { HallService } from 'src/app/services/hall.service';
import { MoviedatabaseService } from 'src/app/services/moviedatabase.service';
import { PassdataService } from 'src/app/services/passdata.service';
import { IMovieDetail } from 'src/app/types/moviedetail';
import { IScreening, IHall } from 'src/app/types/screenings';

@Component({
  selector: 'app-add-screenings-tofilm',
  templateUrl: './add-screenings-tofilm.component.html',
  styleUrls: ['./add-screenings-tofilm.component.css'],
})
export class AddScreeningsTofilmComponent implements OnInit {
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

  async submit() {
    console.log(this.dataPasser.filmId);
    console.log(this.screeningArrays);

    await this.filmService.addScreeningToFilm(
      this.dataPasser.filmId,
      this.screeningArrays
    );

    this.router.navigate(['/admin']);
    this.dataPasser.clearFilm();
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

  onHallChange(event: any) {
    if (event.target != null) {
      console.log(event.target.value);
    }
  }
}
