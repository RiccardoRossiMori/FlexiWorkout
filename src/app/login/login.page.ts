import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthenticationService} from "../pages/signin/services/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.authenticationService.login({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe({
      next: () => this.router.navigate(['home']),
      error: err => {
        this.snackBar.open(err.message, "OK", {duration: 5000})
      }
    });
  }
}
