import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { requiredValidator } from 'src/app/_main/validators/required.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor() {}

  public form = new FormGroup({
    email: new FormControl('', [requiredValidator()], []),
    password: new FormControl('', [requiredValidator()], []),
  });

  ngOnInit() {}
}
