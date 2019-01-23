import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AsteroidsSearchComponent } from './pages/asteroids-search/asteroids-search.component'
import { SignupComponent } from './auth/signup/signup.component'
import { SigninComponent } from './auth/signin/signin.component'
import { AuthGuardService } from './auth/auth-guard.service'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { LastSearchesComponent } from './components/last-searches/last-searches.component'

const routes: Routes = [
	{ path: '', redirectTo: '/signin', pathMatch: 'full' },
	{ path: 'signup', component: SignupComponent },
	{ path: 'signin', component: SigninComponent },
	{ path: 'last-searches', component: LastSearchesComponent, canActivate: [ AuthGuardService ] },
	{ path: 'user-profile', component: UserProfileComponent, canActivate: [ AuthGuardService ] },
	{ path: 'asteroids-search', component: AsteroidsSearchComponent, canActivate: [ AuthGuardService ] }
]

@NgModule( {
	imports: [ RouterModule.forRoot( routes ) ],
	exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
