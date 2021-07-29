import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenBComponent } from './screen-b.component';

describe('ScreenBComponent', () => {
  let component: ScreenBComponent;
  let fixture: ComponentFixture<ScreenBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
