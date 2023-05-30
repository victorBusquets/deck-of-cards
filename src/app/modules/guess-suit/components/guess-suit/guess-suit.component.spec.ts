import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessSuitComponent } from './guess-suit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { GAME_OPTIONS } from '@constants/common.const';
import { GameModel } from '@models/game.class';
import { GameManagerService } from '@services/game-manager.service';

describe('GuessSuitComponent', () => {
  let component: GuessSuitComponent;
  let fixture: ComponentFixture<GuessSuitComponent>;
  let gameManagerService: GameManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GuessSuitComponent, RouterTestingModule, HttpClientModule]
    });
    fixture = TestBed.createComponent(GuessSuitComponent);
    component = fixture.componentInstance;
    gameManagerService = TestBed.inject(GameManagerService);
    spyOn(gameManagerService, 'getGameDetail')
      .and.returnValue(new GameModel({type: GAME_OPTIONS['guessSuit']}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
