import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterUserRequest} from "../../models/interfaces/user/RegisterUserRequest";
import {RegisterUserResponse} from "../../models/interfaces/user/RegisterUserResponse";
import {Observable} from "rxjs";
import {AuthenticateUserResponse} from "../../models/interfaces/user/AuthenticateUserResponse";
import {AuthenticateUserRequest} from "../../models/interfaces/user/AuthenticateUserRequest";
import {CookieService} from "ngx-cookie-service";
import {JwtPayloadImpl} from "../../models/interfaces/user/JwtPayload";
import {jwtDecode} from "jwt-decode";

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private API_URL = 'http://localhost:8080/api';

	constructor(private http: HttpClient,
							private cookieService: CookieService,
	) {
	}

	isLoggedIn() {
		const token = this.cookieService.get('USER_INFO');
		const decodedToken: JwtPayloadImpl = jwtDecode<JwtPayloadImpl>(token);
		const currentTime = Math.floor(Date.now() / 1000);

		return !!(token && decodedToken.exp <= currentTime);
	}

	registerUser(user: RegisterUserRequest): Observable<RegisterUserResponse> {
		return this.http.post<RegisterUserResponse>(`${this.API_URL}/user`, user);
	}

	authenticateUser(user: AuthenticateUserRequest): Observable<AuthenticateUserResponse> {
		return this.http.post<AuthenticateUserResponse>(`${this.API_URL}/auth`, user);
	}
}
