import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { SignupPayload } from './signup-payload';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  signupPayload: SignupPayload


  constructor(private authService: AuthService, private router: Router, private translateService: TranslateService) {
    const passwordErrorValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      return password.value  != confirmPassword.value ? { 'passwordError': true } : null;
    }

    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      // email: '',
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: passwordErrorValidator });

    this.signupPayload = {
      username: '',
      // email: '',
      password: '',
      confirmPassword: ''
    }
  }

  ngOnInit(): void {
  }
  
  onSubmit() {
    this.signupPayload.username = this.signupForm.get('username').value;
    // this.signupPayload.email = this.signupForm.get('email').value;
    this.signupPayload.password = this.signupForm.get('password').value;
    this.signupPayload.confirmPassword = this.signupForm.get('confirmPassword').value;

    this.authService.signUp(this.signupPayload).subscribe( data => {
      console.log('sign up successful');
      this.router.navigateByUrl('/signup-success');
    }, error => {
      console.log('sign up failed');
      let usernameTaken: string;
      this.translateService.get('login.usernameTaken').subscribe(translation => {
        usernameTaken = translation;
      });
      window.alert(usernameTaken);
    });
  }

}
