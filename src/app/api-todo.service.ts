import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiTodoService {


  constructor(private http: HttpClient) { }

  loginApi(user) {
    return this.http.post('http://localhost:3000/auth/login', user);
  }

  registerApi(user) {
    return this.http.post('http://localhost:3000/auth/register', user);
  }

  addTodoApi(id, todo) {
    return this.http.post('http://localhost:3000/todo/' + id, todo);
  }

  getTodosApi(id) {
    return this.http.get('http://localhost:3000/todo/' + id);
  }

  deleteTodosApi(id , index) {
    return this.http.delete('http://localhost:3000/todo/' + id + '/' + index);
  }

  updateDone(id, index, todo) {
    return this.http.put('http://localhost:3000/todo/' + id + '/' + index, todo);
  }

}




