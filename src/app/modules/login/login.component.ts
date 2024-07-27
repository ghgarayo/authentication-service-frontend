import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from "../../services/user/user.service";
import {RegisterUserRequest} from "../../models/interfaces/user/RegisterUserRequest";
import {AuthenticateUserRequest} from "../../models/interfaces/user/AuthenticateUserRequest";
import {CookieService} from "ngx-cookie-service";
import {MessageService} from "primeng/api";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {JwtPayloadImpl} from "../../models/interfaces/user/JwtPayload";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	loginCard = true;

	loginForm = this.fb.group({
		username: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]]
	});

	registerForm = this.fb.group({
		name: ['', [Validators.required]],
		username: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]]
	});

	constructor(private fb: FormBuilder,
							private userService: UserService,
							private cookieService: CookieService,
							private messageService: MessageService) {
	}

	onSubmitLoginForm() {
		if (this.loginForm.value && this.loginForm.valid) {
			this.userService.authenticateUser(this.loginForm.value as AuthenticateUserRequest)
				.subscribe({
						next: (response) => {
							if (response) {
								var username = this.extractUsernameFromToken(response?.token);
								this.cookieService.set('USER_INFO', response?.token);
								this.loginForm.reset()
								this.messageService.add({
									severity: 'success',
									summary: 'Login efetuado com sucesso!',
									detail: 'Seja bem-vindo(a), ' + username,
									life: 2000
								});
							}
						},
						error: (error) => {
							this.messageService.add({
								severity: 'error',
								summary: 'Error',
								detail: 'Login failed',
								life: 2000
							});
						}
					})
			;
		}
	}

	onSubmitRegisterForm() {
		if (this.registerForm.value && this.registerForm.valid) {
			this.userService.registerUser(this.registerForm.value as RegisterUserRequest)
				.subscribe({
					next: (response) => {
						this.registerForm.reset();
						this.loginCard = true;
					},
					error: (error) => {
						console.error(error);
					}
				});
		}
	}

	extractUsernameFromToken(tokenJWT : string) {
		const decodedToken: JwtPayloadImpl = jwtDecode<JwtPayloadImpl>(tokenJWT);
		return decodedToken.name;
	}


}
