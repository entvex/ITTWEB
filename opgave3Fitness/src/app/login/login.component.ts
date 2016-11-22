import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../Authentication.Service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,private webapiService: AuthenticationService) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [''],
      password: ['']
    });
  };

  onSubmit(form: any) {
    this.webapiService.login(form.email,form.password).subscribe(result => {
      console.log('Username or password is correct');

    }, error => {
      if (error.status === 401){
        console.log('Username or password is incorrect');
      }
    });
  }
}
