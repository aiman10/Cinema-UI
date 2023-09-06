import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { lastValueFrom, throwError } from 'rxjs';
import { ICustomer } from '../customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  public async createCustomer(customer: ICustomer) {
    try {
      await lastValueFrom(
        this.http
          .post<ICustomer>('http://localhost:3000/customers', customer)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 409) {
                console.log(
                  'Conflict: Customer with the same email or phone already exists.'
                );
              } else {
                console.error('An error occurred:', error.message);
              }
              return throwError(error);
            })
          )
      );
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}
