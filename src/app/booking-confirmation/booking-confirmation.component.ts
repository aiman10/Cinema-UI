import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HallService } from '../services/hall.service';
import { ScreeningService } from '../services/screening.service';
import { FilmService } from '../services/film.service';
import { IFilm } from '../types/films';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css'],
})
export class BookingConfirmationComponent implements OnInit {
  name = '';
  email = '';
  phone = '';
  totalPrice = 0;
  ticketAmount = 0;
  filmId!: string;
  screeningId!: string;
  hallNumber = 0;
  movieName!: string;
  film!: IFilm;
  url = '';
  qrCodeData = 'Your QR Code Data Here';

  constructor(
    private route: ActivatedRoute,
    private screeningService: ScreeningService,
    private filmService: FilmService
  ) {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  async ngOnInit() {
    const navigationState = this.route.snapshot.queryParams?.['state'];

    if (navigationState) {
      const state = JSON.parse(navigationState);
      this.name = state.name;
      this.email = state.email;
      this.phone = state.phone;
      this.filmId = state.filmId;
      this.totalPrice = state.totalPrice;
      this.ticketAmount = state.ticketAmount;
      this.screeningId = state.screeningId;
    }
    this.hallNumber = (
      await this.screeningService.getScreeningById(this.screeningId)
    ).hallNumber;
    this.film = await this.filmService.getFilm(this.filmId);

    this.url = this.film.posterUrl;
  }

  documentDefinition = {
    content: [],
  };

  pdf() {
    const pdfContent = {
      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', 'auto', 100, '*'],

            body: [
              ['Name:', this.name, '', ''],
              ['Email:', this.email, '', ''],
              ['Phone:', this.phone, '', ''],
              ['Number of Tickets:', this.ticketAmount, '', ''],

              [
                'Total Price:',
                `€${this.totalPrice}`,
                'Date:',
                'August 15, 2023, 18:00 - 20:00',
              ],
              [
                'Hall:',
                this.hallNumber,
                'Booking Reference Number:',
                'ABC123DEF',
              ],

              // Add more rows as needed
            ],
          },
        },
      ],
    };

    let pdf = pdfMake.createPdf(pdfContent);
    pdf.open();
  }
}

/*
 content: [
      // Title
      { text: 'Booking Details', style: 'title' },

      // Customer Information
      {
        ul: [
          { text: `Name: ${this.name}` },
          { text: `Email: ${this.email}` },
          { text: `Phone: ${this.phone}` },
          { text: `Number of Tickets: ${this.ticketAmount}` },
          // Add more customer information as needed
        ],
      },

      // Additional Details
      {
        ul: [
          { text: `Total Price: €${this.totalPrice}` },
          { text: `Date: August 15, 2023, 18:00 - 20:00` },
          { text: `Hall: ${this.hallNumber}` },
          // Add more additional details as needed
        ],
      },

      // Booking Reference Number
      { text: `Booking Reference Number: ABC123DEF`, margin: [0, 10] },

      // Confirmation Message
      {
        text: 'We have sent a confirmation email to your provided email address. Make sure to check your spam folder.',
        margin: [0, 10],
      },

      // Movie Poster
      {
        image: 'data:image/jpeg;base64, yourBase64ImageHere', // Replace with your actual image data
        width: 100, // Adjust the width as needed
        margin: [10, 10, 10, 0], // Margin values: top, right, bottom, left
      },
      { text: this.film.title, style: 'movieTitle' },
    ],

    // Styles for your content
    styles: {
      title: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
      movieTitle: { fontSize: 14, bold: true, margin: [10, 0] },
    },
*/
