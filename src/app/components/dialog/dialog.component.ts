import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: '[appDialog]',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(private element: ElementRef) {}

  showModal() {
    this.element.nativeElement.showModal();
  }

  closeModal(): void {
    this.element.nativeElement.close();
  }
}
