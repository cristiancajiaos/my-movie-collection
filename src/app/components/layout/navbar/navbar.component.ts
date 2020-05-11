import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService]
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;
  user$: Observable<any> = this.authService.afAuth.user;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  closeIsNotCollapsed() {
    if (!this.isCollapsed) {
      this.toggleCollapse();
    }
  }

  logOut() {
    this.closeIsNotCollapsed();
    try {
      this.authService.logOut();
      this.toastr.success('Sesión cerrada exitosamente');
      this.router.navigate(['/home']);
    } catch (error) {
      this.toastr.error(error, 'Error');
    }

  }

}
