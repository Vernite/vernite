/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { MatDialogTestingProvider } from '@tests/helpers/mat-dialog-testing-provider.helper';
import { UpperNavigationComponent } from './upper-navigation.component';

describe('UpperNavigationComponent', () => {
  let component: UpperNavigationComponent;
  let fixture: ComponentFixture<UpperNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientModule, RouterTestingModule],
      declarations: [UpperNavigationComponent],
      providers: [...MatDialogTestingProvider],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpperNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
