/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from '@main/_main.module';

import { SettingsLocalizationPage } from './settings-localization.page';

describe('SettingsLocalizationPage', () => {
  let component: SettingsLocalizationPage;
  let fixture: ComponentFixture<SettingsLocalizationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MainModule, BrowserAnimationsModule, ReactiveFormsModule],
      declarations: [SettingsLocalizationPage],
      providers: [NgControl],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLocalizationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
