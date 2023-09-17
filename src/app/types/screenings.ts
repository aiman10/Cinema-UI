import { ObjectId } from 'mongodb';
export type Screenings = IScreening[];

export interface IScreening {
  _id?: ObjectId;
  //hallId: string;
  hallNumber: number;
  price: number;
  type: string;
  startTime: string;
  endTime: string;
  availableSeats: number;
  bookedSeats: number;
  movieId?: string;
}

export type Halls = IHall[];

export interface IHall {
  _id?: ObjectId;
  hallNumber: number;
  capacity: number;
}
