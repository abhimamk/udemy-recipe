import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthRequestData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  constructor(private authService: AuthService, private router: Router) { }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    let authObs: Observable<AuthRequestData>;
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLoginMode) {
     authObs =  this.authService.login(email, password);
    } else {
     authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(response => {
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },
      errorMessageResponce => {
        console.log(errorMessageResponce);
        this.errorMessage = errorMessageResponce;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
