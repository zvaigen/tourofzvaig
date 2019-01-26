import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SearchHistoryModelComponent } from '../search-history-model/search-history-model.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  isLoggedIn:any;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, public dialog: MatDialog, private authService: AuthService) {
    
  }

  ngDoCheck(){    

  }
  

  openHistoryDialog(): void {
    var arrayOfValues = Object.keys(localStorage).filter(key => key != "isLoggedIn").map(key => localStorage.getItem(key));
    console.log(arrayOfValues);
    const dialogRef = this.dialog.open(SearchHistoryModelComponent, {
      width: '350px',
      height: '350px',
      data: arrayOfValues
    });
    
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }


  logout() {
		this.authService.logout();
    this.router.navigate(['/signin']);
	}
  
}
