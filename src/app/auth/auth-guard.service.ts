import { Injectable } from '@angular/core'
import { AuthService } from './auth.service'
import { CanActivate, Router, } from '@angular/router'
import { map } from 'rxjs/operators'

@Injectable( {
	providedIn: 'root'
} )
export class AuthGuardService implements CanActivate {
	constructor( private authService: AuthService, private router: Router ) {
	}

	public canActivate(): any {
		return this.authService.userLoggedIn.pipe( map( ( authenticated ) => {
			if ( !authenticated ) {
				this.router.navigate( [ 'signin' ] )
			}

			return authenticated
		} ) )
	}
}
