/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MainModule } from '@main/_main.module';
import { GithubIntegrationPage } from './github-integration.page';

describe('GithubIntegrationPage', () => {
  let component: GithubIntegrationPage;
  let fixture: ComponentFixture<GithubIntegrationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MainModule, RouterTestingModule],
      declarations: [GithubIntegrationPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubIntegrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
