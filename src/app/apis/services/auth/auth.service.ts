import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from './models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;

  constructor(private http: HttpClient) { }

  getToken() {return this.token;}

  login(email: string, password: string) {
    const authData : Auth = {
      email: email, 
      password: password
    }
    this.http.post<{token: string}>("http://localhost:3000/api/user/login", authData).subscribe( response => {
      const token = response.token;
      this.token = token;
    });
  }

  creatUser(email: string, password: string) {
    const authData : Auth = {
      email: email, 
      password: password
    }
    this.http.post("http://localhost:3000/api/user/signup", authData).subscribe( response => {
      console.log(response);
    });
  }
}
