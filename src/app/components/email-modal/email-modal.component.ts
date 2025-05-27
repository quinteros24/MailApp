import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Email } from '../../core/models/email.model';

declare var bootstrap: any;

@Component({
  selector: 'app-email-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.css']
})
export class EmailModalComponent implements OnInit, OnDestroy {
  @Input() email: Email | null = null;
  @Output() close = new EventEmitter<void>();

  private modal: any;

  ngOnInit() {
    // Inicializar el modal de Bootstrap
    const modalElement = document.getElementById('emailModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
      this.modal.show();
      
      // Escuchar cuando se cierre el modal
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.close.emit();
      });
    }
  }

  ngOnDestroy() {
    if (this.modal) {
      this.modal.dispose();
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES') + ' ' + 
           date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  closeModal() {
    if (this.modal) {
      this.modal.hide();
    }
  }
}
