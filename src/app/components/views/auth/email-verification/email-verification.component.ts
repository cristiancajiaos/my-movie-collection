import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-email-verification",
  templateUrl: "./email-verification.component.html",
  styleUrls: ["./email-verification.component.scss"],
  providers: [AuthService],
})
export class EmailVerificationComponent implements OnInit {
  user$: Observable<any> = this.authService.afAuth.user;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  resendVerificationEmail() {
    this.authService.sendVerificationEmail();
  }
}
