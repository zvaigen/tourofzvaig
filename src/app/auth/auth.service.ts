import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { User } from '../models/user';
import UserCredential = firebase.auth.UserCredential
import { take, takeWhile, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';


@Injectable()
export class AuthService {

    private static TOKEN: string
	private user: Observable<User>
    public isAuth: boolean = false;

    constructor(private router: Router, private cookieService: CookieService) {
        // firebase.auth().onAuthStateChanged( user => {
        //     return false
        //     console.log( user )
        // } )
    }

    async signup( email: string, password: string ): Promise<void> {
        await firebase.auth().createUserWithEmailAndPassword( email, password )
        
        AuthService.TOKEN = await firebase.auth().currentUser.getIdToken()
        await this.writeUserData( email, password )
        this.cookieService.put('accept-cookie', AuthService.TOKEN)
        this.initUserObservable();
        this.user.subscribe( u => console.log(u))
	}
    
    async signin( email: string, password: string ): Promise<void> {
        const credentials: UserCredential = await firebase.auth().signInWithEmailAndPassword( email, password )
        AuthService.TOKEN = await firebase.auth().currentUser.getIdToken()
        this.cookieService.put('accept-cookie', AuthService.TOKEN)
        this.initUserObservable();
    }
    
    async signinGoogle(): Promise<void> {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
          firebase.auth().currentUser.getIdToken()
                .then(
                    (token: string) => AuthService.TOKEN = token
                )
                this.cookieService.put('accept-cookie', AuthService.TOKEN)
                this.initUserObservable();
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          this.router.navigate(['/asteroids-search']);
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    }
    
    initUserObservable(){
        if(firebase.auth) { 
            this.user = of(firebase.auth().currentUser).pipe(
                takeWhile( user => user!=null ),
                map(fbUser => {
                    const user: User = {
                       email: fbUser.email,
                       username: '',
                       firstName: '',
                       lastName: '',
                       image: '',
                    };
                    return user;
                })
            ) 
        }
    }

    getToken() {
        return AuthService.TOKEN;
	}
    
    getUser(): Observable<User> {
        if(this.user){
            return this.user.pipe( take( 1 ) )
        }
	}
    
    async logout(): Promise<void> {
        await firebase.auth().signOut()
        AuthService.TOKEN = null;
        this.user = null;
        this.isAuth = false;

    }
    
    isAuthenticated(): Observable<boolean> {
        // In the meanwhile it will return false
        if(this.user){
            this.isAuth = true;
            return of(firebase.auth().currentUser).pipe( map( user => user != null ) );
        }        
        else{
            this.isAuth = false;
             of(false);
        }
    }
    
    async writeUserData( email, password ) {
        const userId = firebase.auth().currentUser.uid
        await firebase.database().ref( 'users/' + userId ).set( {
            email: email,
			password: password,
		} )
	}
    
    ReadUserData() {
        var ref = firebase.database().ref();
        ref.on("value", function(snapshot) {
            console.log(snapshot.val());
        }, function (error) {
            console.log("Error: " + error.code);
        });
    }
}



// signinUser(email: string, password: string) {
    //    return firebase.auth().signInWithEmailAndPassword(email, password)
    //     .then(
        //         response => {
            //             firebase.auth().currentUser.getIdToken()
            //             .then(
                //                 (token: string) => this.token = token,
                //             )
                //         }
                //     )
                //     .catch(function(error) {
                    //       var errorMessage = error.message;
                    //       var errorCode = error.code;
                    //       if (errorCode === 'auth/wrong-password') {
                        //         alert('Wrong password.');
                        //       } else {
                                //         alert(errorMessage);
                                //       }
                                //       console.log(error);
                                //     });
                            // }
                            
                            
                            // getCurrentUser(){
                                //   var user = firebase.auth().currentUser;
                                //   if(user){
                                    //  
                                    //     return user;
                                        //   }
                                        //   else{
                                            
                                            //   }
                                            //   return this.currentUserSubject.value;
                                            // }
// signupGoogle(){
//   var provider = new firebase.auth.GoogleAuthProvider();
//   firebase.auth().signInWithPopup(provider)
//   .then((result) => {
//     firebase.auth().currentUser.getIdToken()
//           .then(
//               (token: string) => this.token = token
//           )
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//     this.router.navigate(['/asteroids-search']);
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });
// }