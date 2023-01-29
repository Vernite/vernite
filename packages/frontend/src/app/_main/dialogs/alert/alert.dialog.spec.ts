/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDialog } from './alert.dialog';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonComponent } from '../../components/button/button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('AlertComponent', () => {
  let component: AlertDialog;
  let fixture: ComponentFixture<AlertDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule],
      declarations: [AlertDialog, ButtonComponent],
      providers: [
        MatDialogModule,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
