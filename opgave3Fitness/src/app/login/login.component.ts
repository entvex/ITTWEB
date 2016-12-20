import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../Authentication.Service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,private webapiService: AuthenticationService,private router:Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [''],
      password: ['']
    });
  };

  onSubmit(form: any) {
    this.webapiService.login(form.email,form.password).subscribe(result => {
      console.log('Username or password is correct');
      this.webapiService.userIsloggedIn.emit(true);
      this.router.navigate(['./main']);
    }, error => {
      if (error.status === 401){
        console.log('Username or password is incorrect');
      }
    });
  }
}
