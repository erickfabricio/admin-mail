import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { NotificationModel } from '../models/notification.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  api : string = 'http://localhost:3000/api/notifications';

  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  constructor(private http: HttpClient) { }

  getAllNotifications(): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(`${this.api}`).pipe(
      map(data => data.map(data => new NotificationModel().deserialize(data)))
    );
  }

  getNotificationById(id: string): Observable<NotificationModel> {
    return this.http.get<NotificationModel>(`${this.api}/${id}`);
  }

  createNotification(notification: NotificationModel): Observable<NotificationModel>{
    return this.http.post<NotificationModel>(this.api, notification);
  }

}
