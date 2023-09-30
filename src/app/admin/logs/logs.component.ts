import { Component } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
})
export class LogsComponent {
  logs = [
    { title: 'Inception', action: 'added', timestamp: new Date() },
    { title: 'Interstellar', action: 'deleted', timestamp: new Date() },
    { title: 'Godfather', action: 'added', timestamp: new Date() },
    //... more logs
  ];
}
