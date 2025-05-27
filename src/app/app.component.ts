import { Component } from '@angular/core';
import { InboxComponent } from './components/inbox/inbox.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InboxComponent], // Agregar esta línea
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MailApp';
}