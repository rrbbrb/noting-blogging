import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginPayload } from './login-payload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayload: LoginPayload;
  loggedInUsername: string;

  constructor(private authService: AuthService, private router: Router) { 
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
