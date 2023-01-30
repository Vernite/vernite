/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainModule } from '@main/_main.module';

import { SettingsIntegrationsPage } from './settings-integrations.page';

describe('SettingsIntegrationsPage', () => {
  let component: SettingsIntegrationsPage;
  let fixture: ComponentFixture<SettingsIntegrationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MainModule],
      declarations: [SettingsIntegrationsPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsIntegrationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
