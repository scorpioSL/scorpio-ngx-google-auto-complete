import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAutoCompleteComponent } from './google-auto-complete.component';

describe('GoogleAutoCompleteComponent', () => {
  let component: GoogleAutoCompleteComponent;
  let fixture: ComponentFixture<GoogleAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleAutoCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
