import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { NotificationModel } from '../models/notification.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  api : string = 'http://localhost:3000/api/notifications';

  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  constructor(private http: HttpClient) { }

  find(): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(this.api).pipe(
      map(data => data.map(data => new NotificationModel().deserialize(data)))
    );
  }

  findById(id: string): Observable<NotificationModel> {
    return this.http.get<NotificationModel>(`${this.api}/${id}`);
  }

  save(notification: NotificationModel): Observable<NotificationModel>{
    return this.http.post<NotificationModel>(this.api, notification);
  }

  update(notification: NotificationModel): Observable<NotificationModel>{
    return this.http.put<NotificationModel>(`${this.api}/${notification._id}`, notification);
  }

  remove(notification: NotificationModel): Observable<NotificationModel>{
    return this.http.delete<NotificationModel>(`${this.api}/${notification._id}`);
  }

}
