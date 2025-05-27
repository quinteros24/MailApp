import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Email, EmailResponse } from '../models/email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEmails(): Observable<Email[]> {
    return this.http.get<EmailResponse>(this.apiUrl).pipe(
      map(response => {
        if (!response.success) {
          throw new Error('La API no devolvió una respuesta exitosa');
        }
        return response.emails.map(item => {
          const email = item.json;
          email.read = false;
          return email;
        });
      })
    );
  }
}
