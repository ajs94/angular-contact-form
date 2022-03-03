import {Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppSurveyComponent {
  public submissionForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  
  constructor(
    // private appService: appService,
    private formBuilder: FormBuilder,
  ) {
    this.submissionForm = formBuilder.group({
      firstName:  ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      message: '',
    });
  }

  get f() {
    return this.submissionForm.controls;
  }

  onSubmit() {
    let file = new Blob([JSON.stringify(this.submissionForm.getRawValue())], { type: 'text/json;charset=utf-8' });
    saveAs(file, 'results.json')
    // api call to store data would be here probably
  }
}