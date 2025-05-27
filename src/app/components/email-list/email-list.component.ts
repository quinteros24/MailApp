import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailModalComponent } from '../email-modal/email-modal.component';
import { Email } from '../../core/models/email.model';

@Component({
  selector: 'app-email-list',
  standalone: true,
  imports: [CommonModule, EmailModalComponent],
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent {
  @Input() emails: Email[] = [];
  @Output() refresh = new EventEmitter<void>();

  selectedEmails = new Set<string>();
  selectedEmail: Email | null = null;
  showModal = false;
  currentPage = 1;
  itemsPerPage = 10;

  get paginatedEmails(): Email[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.emails.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.emails.length / this.itemsPerPage);
  }

  get paginationInfo(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.emails.length);
    return `${start}-${end}/${this.emails.length}`;
  }

  toggleEmailSelection(emailId: string) {
    if (this.selectedEmails.has(emailId)) {
      this.selectedEmails.delete(emailId);
    }
    else {
      this.selectedEmails.add(emailId);
    }
  }

  toggleAllEmails() {
    const allSelected = this.paginatedEmails.every(email => this.selectedEmails.has(email.id));
    
    if (allSelected) {
      this.paginatedEmails.forEach(email => this.selectedEmails.delete(email.id));
    } else {
      this.paginatedEmails.forEach(email => this.selectedEmails.add(email.id));
    }
  }

  openEmail(email: Email) {
    this.selectedEmail = email;
    this.showModal = true;
    
    // Marcar como leído
    if (!email.read) {
      email.read = true;
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedEmail = null;
  }

  deleteSelectedEmails() {
    if (this.selectedEmails.size === 0) return;

    if (confirm(`¿Estás seguro de que quieres eliminar ${this.selectedEmails.size} correo(s)?`)) {
      // Aquí podrías emitir un evento para manejar la eliminación en el componente padre
      this.selectedEmails.clear();
      this.refresh.emit();
    }
  }

  markSelectedAsRead() {
    this.emails.forEach(email => {
      if (this.selectedEmails.has(email.id)) {
        email.read = true;
      }
    });
    this.selectedEmails.clear();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES') + ' ' + 
           date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  onRefresh() {
    this.refresh.emit();
  }
}
