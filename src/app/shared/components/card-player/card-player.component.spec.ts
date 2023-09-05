import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardPlayerComponent } from './card-player.component';
import { MultimediaService } from '@shared/services/multimedia.service';

describe('CardPlayerComponent', () => {
  let component: CardPlayerComponent;
  let fixture: ComponentFixture<CardPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [CardPlayerComponent],
    providers: [MultimediaService]
});
    fixture = TestBed.createComponent(CardPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
