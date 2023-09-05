import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsGenericComponent } from './sections-generic.component';

describe('SectionsGenericComponent', () => {
  let component: SectionsGenericComponent;
  let fixture: ComponentFixture<SectionsGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionsGenericComponent]
    });
    fixture = TestBed.createComponent(SectionsGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
