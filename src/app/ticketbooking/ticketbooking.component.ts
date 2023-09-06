import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ScreeningService } from '../services/screening.service';
import { IScreening } from '../screenings';
import { CustomerService } from '../services/customer.service';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-ticketbooking',
  templateUrl: './ticketbooking.component.html',
  styleUrls: ['./ticketbooking.component.css'],
})
export class TicketbookingComponent implements OnInit {
  screeningId!: string;
  screening: IScreening | undefined;
  price!: number;
  totalPrice!: number;
  private _Name = '';
  private _Email = '';
  private _Phone = '';
  private _ticketAmount: number = 1;

  NameRequired = false;
  EmailRequired = false;
  PhoneRequired = false;
  EmailValid = true;
  PhoneValid = true;

  constructor(
    private route: ActivatedRoute,
    private screeningService: ScreeningService,
    private router: Router,
    private customerService: CustomerService,
    private ticketService: TicketService
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.screeningId = params.get('id')!;
      //console.log(this.screeningId);
    });
    this.screening = await this.screeningService.getScreeningById(
      this.screeningId
    );
    this.price = this.screening.price;
    this.totalPrice = this.price;
    //console.log(this.screening);
  }

  async submit() {
    this.inputValidator();
    if (
      !this.NameRequired &&
      !this.EmailRequired &&
      !this.PhoneRequired &&
      this.EmailValid &&
      this.PhoneValid
    ) {
      if (this.screening) {
        await this.ticketService.createTicket({
          screeningId: this.screeningId,
          screeningDate: this.screening?.startTime,
          hallNumber: this.screening?.hallNumber,
          quantity: this.ticketAmount * 1,
          totalPrice: this.totalPrice,
          customerName: this.Name,
          email: this.Email,
        });
      }
      //console.log(this.ticketAmount);
      //Stuur user naar confirmation pagina als input geldig is
      const state = {
        name: this.Name,
        email: this.Email,
        phone: this.Phone,
        totalPrice: this.totalPrice,
        ticketAmount: this.ticketAmount,
        filmId: this.screening?.movieId,
        screeningId: this.screening?._id,
      };
      this.router.navigate(['/confirmation'], {
        queryParams: { state: JSON.stringify(state) },
      });
    }
  }

  inputValidator() {
    if (this.Name.length <= 1) {
      this.NameRequired = true;
    }
    if (this.Email.length <= 1) {
      this.EmailRequired = true;
    }
    if (this.Phone.length <= 1) {
      this.PhoneRequired = true;
    }
    if (!this.emailValidator(this.Email) && this.Email.length > 1) {
      this.EmailRequired = false;
      this.EmailValid = false;
      //alert('Invalid email');
    }
    if (!/^\d+$/.test(this.Phone) && this.Phone.length > 1) {
      this.PhoneValid = false;
    }
    if (/^\d+$/.test(this.Phone)) {
      this.PhoneValid = true;
    }
    if (this.emailValidator(this.Email)) {
      this.EmailValid = true;
    }
    if (this.Phone.length > 1) {
      this.PhoneRequired = false;
    }
    if (this.Name.length > 1) {
      this.NameRequired = false;
    }
    if (this.Email.length > 1) {
      this.EmailRequired = false;
    }
  }

  emailValidator(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  nameChanged(event: Event) {
    //console.log(this.Name);
  }

  public get ticketAmount(): number {
    return this._ticketAmount;
  }
  public set ticketAmount(value: number) {
    this.totalPrice = value * this.price;
    this._ticketAmount = value;
  }

  public get Name() {
    return this._Name;
  }
  public set Name(value) {
    this._Name = value;
  }

  public get Email() {
    return this._Email;
  }
  public set Email(value) {
    this._Email = value;
  }

  public get Phone() {
    return this._Phone;
  }
  public set Phone(value) {
    this._Phone = value;
  }
}
