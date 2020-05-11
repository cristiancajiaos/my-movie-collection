import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [AuthService]
})
export class SignInComponent implements OnInit {

  form: FormGroup;

  email = new FormControl('', [Validators.required]);
  pwd = new FormControl('', [Validators.required]);

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

  async signIn() {
    const { email, pwd } = this.form.value;
    try {
      const user = await this.authService.loginIn(email, pwd);
      if (user && user.user.emailVerified) {
        this.toastr.success("Logueado");
        this.router.navigate(["/home"]);
      } else if (user) {
        this.toastr.warning('Tu cuenta aún no está verificada');
        this.router.navigate(['/email-verification']);
      }
    } catch (error) {
      this.toastr.error(error, 'Error');
    }
  }

  async googleLogin() {
    try {
      await this.authService.loginGoogle();
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }
}
