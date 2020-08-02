import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginPayload } from './login-payload';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayload: LoginPayload;
  loggedInUsername: string;

  constructor(private authService: AuthService, private router: Router, private translateService: TranslateService) { 
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.loginPayload = {
      username: '',
      password: ''
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loginPayload.username = this.loginForm.get('username').value;
    this.loginPayload.password = this.loginForm.get('password').value;

    this.authService.logIn(this.loginPayload).subscribe(data => {
      if(data) {
        console.log("Login successful");
        this.router.navigateByUrl('/home');
      } else {
        console.log("Login failed");
      }
    }, error => {
      console.log(error);
      let invalid: string;
      this.translateService.get('login.invalid').subscribe(translation => {
        invalid = translation;
      });
      window.alert(invalid);
    });
  }

  isAuthenticated(): boolean {
    this.loggedInUsername = this.authService.getUsername();
    return this.authService.isAuthenticated();
  }

  onLogOut() {
    this.authService.logOut();
  }
}
