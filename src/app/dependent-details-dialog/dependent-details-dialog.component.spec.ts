import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentDetailsDialogComponent } from './dependent-details-dialog.component';

describe('DependentDetailsDialogComponent', () => {
  let component: DependentDetailsDialogComponent;
  let fixture: ComponentFixture<DependentDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependentDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
