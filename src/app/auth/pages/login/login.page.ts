import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { requiredValidator } from 'src/app/_main/validators/required.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor() {}

  /**
   * Form group for login.
   */
  public form = new FormGroup({
    email: new FormControl('', [requiredValidator()], []),
    password: new FormControl('', [requiredValidator()], []),
  });

  ngOnInit() {}
}
