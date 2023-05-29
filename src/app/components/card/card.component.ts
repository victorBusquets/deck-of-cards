import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BACK_CARD_IMG } from '@constants/common.const';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  cardVisible: boolean = false;
  @Input() img!: string;
  @Input() animation: boolean = true;
  @Input() noEvents: boolean = false;
  @Input() set visible(visible: boolean) {
    setTimeout(()=> this.cardVisible = visible, 10);
  };
  @Input() disabled: boolean = false;
  @Output() cardClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  readonly backCardImg: string = BACK_CARD_IMG;
}
