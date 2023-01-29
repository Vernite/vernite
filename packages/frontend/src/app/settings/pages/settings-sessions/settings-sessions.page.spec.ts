/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainModule } from '@main/_main.module';

import { SettingsSessionsPage } from './settings-sessions.page';

describe('SettingsSessionsPage', () => {
  let component: SettingsSessionsPage;
  let fixture: ComponentFixture<SettingsSessionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MainModule],
      declarations: [SettingsSessionsPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSessionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
