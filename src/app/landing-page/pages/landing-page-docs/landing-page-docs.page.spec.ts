/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageDocsPage } from './landing-page-docs.page';

describe('LandingPageDocsPage', () => {
  let component: LandingPageDocsPage;
  let fixture: ComponentFixture<LandingPageDocsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPageDocsPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageDocsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
