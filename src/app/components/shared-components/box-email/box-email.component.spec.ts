import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxEmailComponent } from './box-email.component';

describe('BoxEmailComponent', () => {
  let component: BoxEmailComponent;
  let fixture: ComponentFixture<BoxEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
