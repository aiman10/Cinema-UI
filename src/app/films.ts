import { ObjectId } from 'mongodb';
import { IScreening } from './screenings';

export type Films = IFilm[];

export interface IFilm {
  _id?: ObjectId;
  title: string;
  releaseYear: number;
  director: string;
  description: string;
  rating: number;
  posterUrl: string;
  idAPI: number;
  screenings: IScreening[];
}
