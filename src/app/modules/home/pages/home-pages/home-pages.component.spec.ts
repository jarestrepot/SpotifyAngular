import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { SharedModule } from '@shared/shared.module';
import { HomePagesComponent } from './home-pages.component';
import { RouterTestingModule } from '@angular/router/testing';
describe('HomePagesComponent', () => {
  let component: HomePagesComponent;
  let fixture: ComponentFixture<HomePagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ RouterTestingModule, HomePagesComponent]
});
    fixture = TestBed.createComponent(HomePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
