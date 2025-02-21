import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFromComponent } from './new-from.component';

describe('NewFromComponent', () => {
  let component: NewFromComponent;
  let fixture: ComponentFixture<NewFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
