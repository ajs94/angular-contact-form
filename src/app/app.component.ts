import {Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppSurveyComponent {
  public formSubmitted = false;

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

  async onSubmit() {
    const body = this.submissionForm.getRawValue();

    const response = await fetch("http://localhost:6060", {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'} 
    });
    
    if (!response.ok) 
    { 
        console.error("Error: Unexpected response code");
    }
    else if (response.status >= 400) {
        console.error('HTTP Error: '+response.status+' - '+response.status);
    }
    else {
      this.formSubmitted = true;
    }
  }
}