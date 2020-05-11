import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private toastr: ToastrService
  ) { }

  async registerUser(email: string, pwd: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, pwd);
      this.sendVerificationEmail();
      return result;
    } catch (error) {
      this.toastr.error(error, "Error");
    }

  }

  async loginIn(email: string, pwd: string) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        pwd
      );
      return result;
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found": {
          this.toastr.error("La cuenta con la que intentaste iniciar sesión, no existe");
          break;
        }

        case 'auth/wrong-password': {
          this.toastr.error('La contraseña ingresada, no corresponde a la de la cuenta ingresada');
          break;
        }

        case 'auth/network-request-failed': {
          this.toastr.error('Hubo un problema de comunicación con el servidor');
          break;
        }

        default: {
          this.toastr.error(error, "Error");
          break;
        }
      }
    }

  }

  async logOut() {
    try {
      await this.afAuth.auth.signOut();
    } catch (error) {
      this.toastr.error(error, "Error");
    }

  }

  async getUser() {
    const result = await this.afAuth.authState.pipe(first()).toPromise();
    return result;
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.auth.currentUser).sendEmailVerification();
  }

  async passwordReset(email: string) {
    try {
      return await this.afAuth.auth.sendPasswordResetEmail(email);
    } catch (error) {
      this.toastr.error(error, 'Error');
    }
  }

  async loginGoogle() {
    try {
      return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } catch (error) {
      this.toastr.error(error, 'Error');
    }
  }
}
