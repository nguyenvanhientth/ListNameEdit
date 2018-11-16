import { Injectable } from '@angular/core';
import { Name } from './name';
import {NameData } from './nameData';
import {Observable, of } from 'rxjs';
import {MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NameServiceService {
  private nameUrl = 'api/names';//URL to web api

//** GET names from the server */
  getNames(): Observable<Name[]>{
    return this.http.get<Name[]>(this.nameUrl)
    .pipe(            //**GET ERROR request server */
      //tap(_ => this.log('fetched Names')),// messages then one click
      catchError(this.handleError('getNames ', []))
    );
  }
/* GET names from array data
  getNames(): Observable<Name[]>{
    return of(NameData);
  }
*/
  /* GET name by id not server 
  getName(id: number): Observable<Name>{
     this.messageService.add(`NameService: fetched name id=${id}`);
     return of(NameData.find(name => name.id === id));
   }
   */
  // GET name by id. Will 404 if id not found
   getName(id: number): Observable<Name> {
     const url = `${this.nameUrl}/${id}`;
     return this.http.get<Name>(url).pipe(
        tap(_ => this.log(`fetched name id=${id}`)),
        catchError(this.handleError<Name>(`getName id=${id}`))
     )
   }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }
  private log(message: string) {
    this.messageService.add(`NameService: ${message}`);
  }
  private handleError<T> (operators = 'operation', result?: T) {
    return (error: any) : Observable<T> => {

      // send the error to remove logging infrastructure
      console.error(error); // log to console instead

      // better job of transforming error for user consumption
      this.log(`${operators} failed: ${error.message}`);

      // let the app keep running by returning an empty result
      return of(result as T);
    }
  }
  //** PUT: update the name on server */
  updateName (name: Name): Observable<any>{
    const httpOptions = {           //** header request when request PUT  */
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(this.nameUrl, name, httpOptions).pipe(
      tap(_=> this.log(`update name id=${name.id}`)),
      catchError(this.handleError<any>('updateName'))
    )
  }
  //** POST: add a new name server */
  addName (name: Name): Observable<Name> {
    const httpOptions = {           //** header request when request PUT  */
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<Name>(this.nameUrl, name , httpOptions).pipe(
      tap((name:Name) => this.log(`Added name id=${name.id}`)),
      catchError(this.handleError<Name>('AddName'))
    );
  }
  //** DELETE: delete the name from server */
  deleteName(name: Name | number): Observable<Name>{
    const httpOptions = {           //** header request when request PUT  */
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    const id = typeof name === 'number' ? name : name.id;
    const url = `${this.nameUrl}/${id}`;

    return this.http.delete<Name>(url, httpOptions).pipe(
      tap(_=> this.log(`Deleted name id=${id}`)),
      catchError(this.handleError<Name>('DeleteName'))
    )
  }
  //** GET name whose name contains search term */
  searchName(term: string): Observable<Name[]>{
    if (!term.trim()) {
      //neu ko tim cum tu thi tra ve arr trong
      return of([]);
    }
    return this.http.get<Name[]>(`${this.nameUrl}/?name=${term}`).pipe(
      tap(_=> this.log(`Found name matching "${term}"`)),
      catchError(this.handleError<Name[]>('SearchName', []))
    );
  }
}
