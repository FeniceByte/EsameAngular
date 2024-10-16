import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; //URL del json-server

  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

 authenticate(username: string, password: string): Observable< User | undefined >{
  return this.getUsers().pipe(
    map((users:any[]) => users.find(user => user.username === username && user.password === password))
  )
 }

} 
