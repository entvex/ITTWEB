import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../Authentication.Service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,private webapiService: AuthenticationService,private router:Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [''],
      name: [''],
      password: ['']
    });
  };

  onSubmit(form: any) {
    this.webapiService.register(form.email,form.password,form.name).subscribe(result => {
      console.log("User created");
      this.router.navigate(['./main']);
    }, error => {
      if (error.status === 404){
        console.log("Something went wrong!");
      }
    });
  }
}
