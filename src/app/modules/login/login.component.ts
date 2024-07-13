import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from "../../services/user/user.service";
import {RegisterUserRequest} from "../../models/interfaces/user/RegisterUserRequest";
import {AuthenticateUserRequest} from "../../models/interfaces/user/AuthenticateUserRequest";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginCard = true;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private userService: UserService) {
  }

  onSubmitLoginForm() {
    const data: AuthenticateUserRequest = {
      username: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    };

    this.userService.authenticateUser(data)
      .subscribe(response => {
        console.log(response);
      })

  }

  onSubmitRegisterForm() {
    const user: RegisterUserRequest = {
      name: this.registerForm.value.name!,
      username: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    };

    this.userService.registerUser(user)
      .subscribe(response => {
        console.log(response);
      });
  }
}
