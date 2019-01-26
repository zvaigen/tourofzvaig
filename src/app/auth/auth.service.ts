import * as firebase from 'firebase'
import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import UserCredential = firebase.auth.UserCredential
// import { CookieService } from 'angular2-cookie/services/cookies.service'
import { Subject, of, Observable } from 'rxjs'
import { takeWhile, map } from 'rxjs/operators'
import { User } from '../models/user';


@Injectable()
export class AuthService {
	private static TOKEN: string
	public authenticated: boolean = false
	public userLoggedIn = new Subject()

    // private cookieService: CookieService
    
	constructor( private router: Router ) {
		this.isAuthenticated();
	}

	async signup( email: string, password: string ): Promise<void> {
		await firebase.auth().createUserWithEmailAndPassword( email, password )

		AuthService.TOKEN = await firebase.auth().currentUser.getIdToken()
        await this.writeUserData( email, password )
        localStorage.setItem("user", firebase.auth().currentUser.uid)

		// this.cookieService.put( 'Accept-Cookie', AuthService.TOKEN )
	}

	async signin( email: string, password: string ): Promise<void> {
		const credentials: UserCredential = await firebase.auth().signInWithEmailAndPassword( email, password )
		this.authenticated = true;
        AuthService.TOKEN = await firebase.auth().currentUser.getIdToken();
        localStorage.setItem("user", firebase.auth().currentUser.uid)
        debugger
		// this.cookieService.put( 'Accept-Cookie', AuthService.TOKEN )
	}

	getToken() {
		return AuthService.TOKEN
	}

    getUser(): Observable<User>{
        return of(firebase.auth().currentUser).pipe(
            takeWhile( u => (u != null) && ( u != undefined )),
            map(user => {
                const currUser: User = {
                    email: user.email,
                    username: '',
                    firstName: '',
                    lastName: '',
                    image: '',
                }
                return currUser;
            })

        )
    }

	async logout(): Promise<void> {
		await firebase.auth().signOut()
		AuthService.TOKEN = null
        this.authenticated = false
		// localStorage.removeItem("user");
		localStorage.clear();
	}

	isAuthenticated(): any {
		firebase.auth().onAuthStateChanged( ( user ) => {
			this.authenticated = !!user
            this.userLoggedIn.next( this.authenticated );
		} )
	}

	async writeUserData( email, password ) {
		const userId = firebase.auth().currentUser.uid
		await firebase.database().ref( 'users/' + userId ).set( {
			email: email,
			password: password,
		} )
	}

	ReadUserData() {
		const ref = firebase.database().ref()
		ref.on( 'value', function ( snapshot ) {
			console.log( snapshot.val() )
		}, function ( error ) {
			console.log( 'Error: ' + error.code )
		} )
	}

	async signinGoogle(): Promise<void> {
		const provider = new firebase.auth.GoogleAuthProvider()
		firebase.auth().signInWithPopup( provider )
			.then( ( result ) => {
				firebase.auth().currentUser.getIdToken().then( ( token: string ) => AuthService.TOKEN = token )
                // this.cookieService.put( 'accept-cookie', AuthService.TOKEN )
                localStorage.setItem("user", firebase.auth().currentUser.uid)
				this.router.navigate( [ '/asteroids-search' ] )
			} ).catch( function ( error ) {
		} )
	}
}
