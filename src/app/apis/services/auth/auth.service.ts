import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from './models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const auth : Auth = {
      email: email, 
      password: password
    }
    this.http.post("http://localhost:3000/api/user/login", auth).subscribe( response => {
      
    });
  }

  creatUser(email: string, password: string) {
    const auth : Auth = {
      email: email, 
      password: password
    }
    this.http.post("http://localhost:3000/api/user/signup", auth).subscribe( response => {
      
    });
  }
}
