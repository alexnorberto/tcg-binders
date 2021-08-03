import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Other components can verify if the user is logged in
   */
  userLoggedIn: boolean;

  /**
   * Verify and authenticate a user
   * @param email
   * @param password
   */
  loginUser(email: string, password: string): Promise<any> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
        // this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        //if (error.code)
          return { isValid: false, message: error.message };
      });
  }

  /**
   * Creates a new user on firebase
   * @param user
   */
  signupUser(user: any): Promise<any> {
    return this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let emailLower = user.email.toLowerCase();

        this.angularFirestore.doc('/users/' + emailLower)                        // on a successful signup, create a document in 'users' collection with the new user's info
          .set({
            accountType: 'endUser',
            displayName: user.displayName,
            displayName_lower: user.displayName.toLowerCase(),
            email: user.email,
            email_lower: emailLower
          });

        result.user.sendEmailVerification();                    // immediately send the user a verification email
      })
      .catch(error => {
        console.log('Auth Service: signup error', error);
        //if (error.code)
          return { isValid: false, message: error.message };
      });
  }

  /**
   * Set a new password to the user
   * @param email
   */
  resetPassword(email: string): Promise<any> {
    return this.angularFireAuth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('Auth Service: reset password success');
        // this.router.navigate(['/amount']);
      })
      .catch(error => {
        console.log('Auth Service: reset password error...');
        console.log(error.code);
        console.log(error)
        if (error.code)
          return error;
      });
  }

  /**
   * Verification email is sent in the Sign Up function, but if you need to resend, call this function
   */
  async resendVerificationEmail() {
    return (await this.angularFireAuth.currentUser).sendEmailVerification()
      .then(() => {
        // this.router.navigate(['home']);
      })
      .catch(error => {
        console.log('Auth Service: sendVerificationEmail error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code)
          return error;
      });
  }

  /**
   * Logout the current user
   */
  logoutUser(): Promise<void> {
    return this.angularFireAuth.signOut()
      .then(() => {
        this.router.navigate(['/home']);                    // when we log the user out, navigate them to home
      })
      .catch(error => {
        console.log('Auth Service: logout error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code)
          return error;
      });
  }

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
  ) {
    this.userLoggedIn = false;

    this.angularFireAuth.onAuthStateChanged((user) => {
      this.userLoggedIn = !!user;
    });
  }
}
