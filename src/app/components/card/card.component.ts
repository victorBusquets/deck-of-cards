import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BACK_CARD_IMG } from '@constants/common.const';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() img!: string;
  @Input() visible: boolean = false;
  readonly backCardImg: string = BACK_CARD_IMG;
}
