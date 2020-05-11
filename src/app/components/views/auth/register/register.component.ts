import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);
  pwd = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: this.email,
      pwd: this.pwd
    });
  }

  createAccount() {
    const { email, pwd } = this.form.value;
    try {
      const user = this.authService.registerUser(email, pwd);
      if (user) {
        this.toastr.success('Cuenta creada');
        this.router.navigate(['/email-verification']);
      } 
    } catch (error) {
      this.toastr.error(error, 'Error');
    }

  }
}
