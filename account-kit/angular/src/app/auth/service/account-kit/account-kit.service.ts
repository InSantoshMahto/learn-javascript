import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/index';

@Injectable({
  providedIn: 'root',
})
export class AccountKitService {
  constructor(private http: HttpClient) {}

  getAccountKitCredential() {
    return this.http
      .get('http://localhost:8500/with-otp')
      .pipe(catchError(this.handleError));
  }

  verifyAccountKit(details) {
    return this.http
      .post('http://localhost:8500/with-otp', details)
      .pipe(catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(error);
  }
}
