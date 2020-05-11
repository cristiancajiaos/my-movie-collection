import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;

  email = new FormControl('', [Validators.required]);
  pwd = new FormControl('', [Validators.required]);
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      email: this.email,
      pwd: this.pwd
    });
  }

  signIn() {
    console.log('signIn()');
  }

  googleLogin() {
    console.log('googleLogin()');
  }
}
