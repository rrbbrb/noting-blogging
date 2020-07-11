import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SignupPayload } from './signup-payload';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  signupPayload: SignupPayload

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    this.signupPayload = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.signupPayload.username = this.signupForm.get('username').value;
    this.signupPayload.email = this.signupForm.get('email').value;
    this.signupPayload.password = this.signupForm.get('password').value;
    this.signupPayload.confirmPassword = this.signupForm.get('confirmPassword').value;

    this.authService.signUp(this.signupPayload).subscribe( data => {
      console.log('sign up successful');
      this.router.navigateByUrl('/signup-success');
    }, error => {
      console.log('sign up failed');
    });
  }

}
