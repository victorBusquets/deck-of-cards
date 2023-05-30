import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackjackComponent } from './blackjack.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { GameModel } from '@models/game.class';
import { GameManagerService } from '@services/game-manager.service';

describe('BlackjackComponent', () => {
  let component: BlackjackComponent;
  let fixture: ComponentFixture<BlackjackComponent>;
  let gameManagerService: GameManagerService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BlackjackComponent, RouterTestingModule, HttpClientModule]
    });
    fixture = TestBed.createComponent(BlackjackComponent);
    component = fixture.componentInstance;
    gameManagerService = TestBed.inject(GameManagerService);
    spyOn(gameManagerService, 'getGameDetail').and.returnValue(new GameModel());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
