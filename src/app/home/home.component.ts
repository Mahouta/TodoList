import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ApiTodoService } from '../api-todo.service';
import * as jwt_decode from 'jwt-decode';
import { Token } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  index = 1;
  public todos: Array<object> = [];
  homeForm: FormGroup;

  id = '';


  constructor(private router: Router, private apitodoservice: ApiTodoService, private cookieService: CookieService) {
    this.homeForm = new FormGroup({
      todo: new FormControl('', [Validators.required])
    });
  }
  ngOnInit() {
    const test: string = this.cookieService.get('token');
    if (!test) {
      this.router.navigate(['login']);
    }

    const decoded = jwt_decode(test);
    this.id = decoded.data._id;
    this.getTodos();


    // console.log(test);
  }


  addTodo() {
    console.log(this.homeForm.value.todo);
    // const decUser = decrypt(userToken);
    const todo = {
      content: this.homeForm.value.todo,
      date: Date().toString(),
      done: 'false'
    };
    this.apitodoservice.addTodoApi(this.id, todo).subscribe(res => {
    });
    return this.todos.push(todo);
  }

  getTodos() {
    console.log(this.id);
    this.apitodoservice.getTodosApi(this.id).subscribe((data: Array<object>) => {
      this.todos = data.todo;

      // console.log(this.todos);
    });
  }

  deleteTodo(index) {
    this.apitodoservice.deleteTodosApi(this.id, index).subscribe(res => {
    });
    return this.todos.splice(index, 1);
  }

  dec(): void {
    this.cookieService.delete('token');
    this.router.navigate(['login']);
  }

  checkValue(event: any) {
    console.log(event);
  }

  FieldsChange(index, values: any) {
    console.log('done', values.currentTarget.checked, 'index', index);
    this.todos[index].done = values.currentTarget.checked;
    console.log(this.todos[index]);
    return this.apitodoservice.updateDone(this.id, index, this.todos[index]).subscribe(res => {
     });
  }

}
