import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router){

  }

  canActivate() {
    if(localStorage.getItem("token")){
      return true;
    }else{
      this.router.navigate(['/main/login']);
      return false;
    }
  }
  
}
