import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterUserRequest} from "../../models/interfaces/user/RegisterUserRequest";
import {RegisterUserResponse} from "../../models/interfaces/user/RegisterUserResponse";
import {Observable} from "rxjs";
import {AuthenticateUserResponse} from "../../models/interfaces/user/AuthenticateUserResponse";
import {AuthenticateUserRequest} from "../../models/interfaces/user/AuthenticateUserRequest";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  registerUser(user: RegisterUserRequest): Observable<RegisterUserResponse> {
    return this.http.post<RegisterUserResponse>(`${this.API_URL}/user`, user);
  }

  authenticateUser(user: AuthenticateUserRequest): Observable<AuthenticateUserResponse> {
    return this.http.post<AuthenticateUserResponse>(`${this.API_URL}/auth`, user);
  }
}
