import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Page } from 'src/app/_main/decorators/page.decorator';
import { emailValidator } from 'src/app/_main/validators/email.validator';
import { requiredValidator } from 'src/app/_main/validators/required.validator';

@Page()
@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.page.html',
  styleUrls: ['./create-workspace.page.scss'],
})
export class CreateWorkspacePage implements OnInit {
  public form = new FormGroup({
    name: new FormControl('', [requiredValidator(), emailValidator()]),
  });

  constructor() {}

  ngOnInit() {
    this.form.valueChanges.subscribe((val) => {
      console.log(val);
    });
  }
}
