import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router,  } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  public canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
		console.log( this.authService.isAuthenticated() )
		if ( !this.authService.isAuthenticated() ) {
      	this.router.navigate( [ 'signin' ] )
      	return false
		}

		return true
	}
  
}

// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
//   if(this.authService.isAuthenticated()){
//     return true;
//   }
//   this.router.navigate(['/signin']);
//   return false;
// }