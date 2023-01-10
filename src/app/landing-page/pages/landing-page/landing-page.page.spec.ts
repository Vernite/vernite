/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPagePage } from './landing-page.page';

describe('LandingPagePage', () => {
  let component: LandingPagePage;
  let fixture: ComponentFixture<LandingPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPagePage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
