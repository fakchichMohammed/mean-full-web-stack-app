import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/apis/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading =  false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSignup(form: NgForm) {
    if(form.invalid) return;
    this.auth.creatUser(form.value.email, form.value.password);
  }

}
