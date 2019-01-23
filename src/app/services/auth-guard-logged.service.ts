import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router,  } from '@angular/router';
import { map, catchError, tap } from "rxjs/operators";
import { from, of } from "rxjs";
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoggedService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    
    if(firebase.auth().currentUser == null){
      return true; //user not exist
    }
    return this.isUserLogged().pipe(
      map( isAuth => {
        if(isAuth){
          this.authService.getToken();
          this.router.navigate(['/asteroids-search']);
          return false;
        }
          return true
      })
      )
  }

  isUserLogged(){
    return from(firebase.auth().currentUser.getIdToken()).pipe(
      map(t => !!t),
      catchError(e => of(false))
    )
  }
}
