import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AsteroidsSearchComponent } from './pages/asteroids-search/asteroids-search.component'
import { SearchFieldComponent } from './components/search-field/search-field.component'
import { MessagesComponent } from './messages/messages.component'
import { CountriestableComponent } from './components/countriestable/countriestable.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog'
import { MatTableModule } from '@angular/material/table';
import { AsteroidInfoModelComponent } from './components/asteroid-info-model/asteroid-info-model.component'
import { MainNavComponent } from './components/main-nav/main-nav.component'
import { LayoutModule } from '@angular/cdk/layout'
import { SearchHistoryModelComponent } from './components/search-history-model/search-history-model.component'
import { SignupComponent } from './auth/signup/signup.component'
import { SigninComponent } from './auth/signin/signin.component'
import { AuthService } from './auth/auth.service'
import { AuthGuardService } from './auth/auth-guard.service'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { LastSearchesComponent } from './components/last-searches/last-searches.component'


@NgModule( {
	declarations: [
		AppComponent,
		AsteroidsSearchComponent,
		SearchFieldComponent,
		MessagesComponent,
		AsteroidInfoModelComponent,
		CountriestableComponent,
		MainNavComponent,
		SearchHistoryModelComponent,
		SignupComponent,
		SigninComponent,
		UserProfileComponent,
		LastSearchesComponent,
	],
	imports: [
		BrowserModule,
		CommonModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatInputModule,
		MatButtonModule,
		MatPaginatorModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatDialogModule,
		LayoutModule,
		MatToolbarModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatTableModule
	],
	providers: [ MatDatepickerModule, AuthService, AuthGuardService], 
	bootstrap: [ AppComponent ],
	entryComponents: [ AsteroidInfoModelComponent, SearchHistoryModelComponent ]
} )
export class AppModule {
}
