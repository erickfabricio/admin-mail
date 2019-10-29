import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { EntityModel } from 'src/app/entity/models/entity.model';
import { UserModel } from 'src/app/entity/models/user.model';
import { SessionModel } from '../models/session.model';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  user: UserModel;

  headers : HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlBvc3RtYW4iLCJuYW1lIjoiVGVzdC1EZXYiLCJzdGF0ZSI6IkEiLCJpYXQiOjE1NzIxOTE1Njd9.PJEZWZKhWVOTsWAAIG-H2tTZp0g01LxVSifkQnhkJGQ'
  });

  options = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }
  
  login(user: UserModel): Observable<any> {
    return this.http.post(`http://localhost:3000/api/session/login`, user);
  }


}
