/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewComponent } from './main-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarNavigationComponent } from '../sidebar-navigation/sidebar-navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { NavElementComponent } from '../nav-element/nav-element.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from '../icon/icon.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UpperNavigationComponent } from '../upper-navigation/upper-navigation.component';
import { SnackbarOutletComponent } from '../snackbar-outlet/snackbar-outlet.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgControl } from '@angular/forms';

describe('MainViewComponent', () => {
  let component: MainViewComponent;
  let fixture: ComponentFixture<MainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FontAwesomeModule,
        MatIconModule,
        MatMenuModule,
        MatDialogModule,
      ],
      declarations: [
        MainViewComponent,
        SidebarNavigationComponent,
        NavElementComponent,
        IconComponent,
        UpperNavigationComponent,
        SnackbarOutletComponent,
      ],
      providers: [
        MatDialogModule,
        NgControl,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
