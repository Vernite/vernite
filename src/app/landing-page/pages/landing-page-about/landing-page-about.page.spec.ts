/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageAboutPage } from './landing-page-about.page';

describe('LandingPageComponent', () => {
  let component: LandingPageAboutPage;
  let fixture: ComponentFixture<LandingPageAboutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPageAboutPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageAboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
