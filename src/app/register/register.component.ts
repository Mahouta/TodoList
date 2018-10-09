import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ApiTodoService } from '../api-todo.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;


  constructor(private apitodoservice: ApiTodoService ) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(5), Validators.required]),
      firstName: new FormControl('', [Validators.minLength(3), Validators.required]),
      lastName: new FormControl('', [Validators.minLength(3), Validators.required]),
    });
  }

  ngOnInit() {
  }

  register() {
    console.log(this.registerForm.value);
    this.apitodoservice.registerApi(this.registerForm.value).subscribe(res => {
    });

}}
