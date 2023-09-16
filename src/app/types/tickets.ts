import { ObjectId } from 'mongodb';

export type Tickets = ITicket[];

export interface ITicket {
  _id?: ObjectId;
  screeningId: string;
  screeningDate: string;
  hallNumber: number;
  quantity: number;
  totalPrice: number;
  customerName: string;
  email: string;
}
