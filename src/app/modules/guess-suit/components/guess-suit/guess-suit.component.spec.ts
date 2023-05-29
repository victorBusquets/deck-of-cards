import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessSuitComponent } from './guess-suit.component';

describe('GuessSuitComponent', () => {
  let component: GuessSuitComponent;
  let fixture: ComponentFixture<GuessSuitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuessSuitComponent]
    });
    fixture = TestBed.createComponent(GuessSuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
