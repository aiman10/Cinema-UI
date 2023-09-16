import { ObjectId } from 'mongodb';

export type Customers = ICustomer[];

export interface ICustomer {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string;
  bookedTickets: BookedTicket[];
}

export interface BookedTicket {
  screeningId: ObjectId;
  quantity: number;
  totalPrice: number;
  _id?: ObjectId;
}
