import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../pages/signin/services/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form!: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  signup() {
    if (this.passwordMatchValidator(this.form)) {
      this.authenticationService.signup({
        email: this.form.value.email,
        password: this.form.value.password
      }).subscribe({
        next: () => this.router.navigate(['home']),
        error: err => {
          this.snackBar.open(err.message, "OK", {duration: 5000})
        }
      });
    } else {
      this.snackBar.open("Immettere la stessa password due volte!", "OK", {duration: 5000})
    }
  }
}
