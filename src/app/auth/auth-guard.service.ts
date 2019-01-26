import { Injectable } from '@angular/core'
import { AuthService } from './auth.service'
import { CanActivate, Router, } from '@angular/router'

@Injectable( {
	providedIn: 'root'
} )
export class AuthGuardService implements CanActivate {
	constructor( private authService: AuthService, private router: Router ) {
	}

	public canActivate(): any {
    if (localStorage.getItem('user')) { return true; }
    console.log('access denied!')
    this.router.navigate(['/signin']);
    return false
	}
}

