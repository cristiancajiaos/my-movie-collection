import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  providers: [AuthService]
})
export class PasswordResetComponent implements OnInit {

  form: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: this.email
    });
  }

  async sendResetEmail() {
    try {
      const email = this.form.value.email;
      await this.authService.passwordReset(email);
      this.toastr.success('Se envió a tu correo, un mensaje para resetear la contraseña');
      this.router.navigate(['/sign-in']);
    } catch (error) {
      this.toastr.error(error, 'Error');
    }
  }

}
