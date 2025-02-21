import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldCreationPopupComponent } from './input-field-creation-popup.component';

describe('InputFieldCreationPopupComponent', () => {
  let component: InputFieldCreationPopupComponent;
  let fixture: ComponentFixture<InputFieldCreationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFieldCreationPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFieldCreationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
