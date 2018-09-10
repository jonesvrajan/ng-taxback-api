import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Url } from "../models/config";
import { Transaction } from "../models/transaction";

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json; charset=utf-8'}
  )
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  // URL to web api
  txnsUrl = 'https://jointhecrew.in/api/txns/';  
  user = 'priya@gmail.com';
  id='';

  constructor(private http: HttpClient) { }

  getTxns (): Observable<Transaction[]> {
    return this.http.get < Transaction[] > (this.txnsUrl + this.user);
  }

   /** POST: add a new hero to the server */
   addTxn (txn: Transaction): Observable<Transaction> {
   const headers = new HttpHeaders().set('content-type', 'application/json; charset=utf-8');
    
    return this.http.post<Transaction>(this.txnsUrl + this.user, txn, {headers})
    
  }
/** POST: add a new hero to the server */
updateTxn (txn: Transaction, id: any): Observable<Transaction> {
  const headers = new HttpHeaders().set('content-type', 'application/json; charset=utf-8');
  console.log(this.txnsUrl + this.user + id);
   return this.http.post<Transaction>(this.txnsUrl + this.user + id , txn, {headers})
   
 }

}
