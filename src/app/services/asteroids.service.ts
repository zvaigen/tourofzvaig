import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Asteroid } from '../models/asteroid';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AsteroidsService {

  private apiKey = 'djDdijXrKTFHTW8A0psaRsAgZu6ECAqv1qctjz9O';
  private nasaApiUrl = `https://api.nasa.gov/neo/rest/v1/feed?&api_key=${this.apiKey}`; 
  
  constructor(private http: HttpClient, private messageService: MessageService) { }

/** GET Asteroids from the server               */
getAsteroids (startDate: string, endDate: string): Observable<Asteroid[]> {
  return this.http.get<Asteroid[]>(this.nasaApiUrl+`&start_date=${startDate}&end_date=${endDate}`)
    .pipe(
      tap(_ => this.log('fetched Asteroids')),
      catchError(this.handleError('getAsteroids', []))
    ); 
}

searchAsteroids(term: string): Observable<Asteroid[]> {
  if (!term.trim()) {
    // if not search term, return empty country array.
    return of([]);
  }
  return this.http.get<Asteroid[]>(`${this.nasaApiUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found Asteroids matching "${term}"`)),
    catchError(this.handleError<Asteroid[]>('searchAsteroids', []))
  );
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

/** Log a message with the MessageService */
private log(message: string) {
  this.messageService.add(`CountryService: ${message}`);
}

}
