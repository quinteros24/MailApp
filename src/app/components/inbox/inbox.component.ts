import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailListComponent } from '../email-list/email-list.component';
import { EmailService } from '../../core/services/email.service';
import { Email } from '../../core/models/email.model';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, FormsModule, EmailListComponent],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  emails: Email[] = [];
  filteredEmails: Email[] = [];
  totalEmails = 0;
  isLoading = false;
  error: string | null = null;
  searchTerm = '';

  constructor(private emailService: EmailService) {}

  ngOnInit() {
    this.loadEmails();
  }

  loadEmails() {
    this.isLoading = true;
    this.error = null;
    
    this.emailService.getEmails().subscribe({
      next: (emails) => {
        this.emails = emails;
        this.filteredEmails = emails;
        this.totalEmails = emails.length;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = `Error al cargar los correos: ${error.message}`;
        this.isLoading = false;
      }
    });
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredEmails = this.emails;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredEmails = this.emails.filter(email =>
      email.from.toLowerCase().includes(term) ||
      email.subject.toLowerCase().includes(term) ||
      email.body.toLowerCase().includes(term)
    );
  }

  onRefresh() {
    this.loadEmails();
  }

  onRetry() {
    this.loadEmails();
  }
}
