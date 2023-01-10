/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageChangelogPage } from './landing-page-changelog.page';

describe('LandingPageChangelogPage', () => {
  let component: LandingPageChangelogPage;
  let fixture: ComponentFixture<LandingPageChangelogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPageChangelogPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageChangelogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
