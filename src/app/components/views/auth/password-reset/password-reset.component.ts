import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  form: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      email: this.email
    });
  }

  sendResetEmail() {
    console.log('sendResetEmail');
  }

}
