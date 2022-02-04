import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

/**
 * Setup consts for tcg api
 */
const tcgApiUrl = "https://api.pokemontcg.io/v2/cards";
const headers = new HttpHeaders().set('x-api-key', environment.tcgAPI);

/**
 * This services deal with tcg api requests
 */
@Injectable({
  providedIn: 'root'
})
export class TcgApiService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Create header for get api data
   * @param headers
   */
  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json');
    headers.append('x-api-key', '7cf869e2-9e98-421a-b24c-e5b2e29ca855');
    console.log(headers)
  }

  /**
   * Get list of cards with default pagination (20)
   */
  get(): Observable<any>{
    return this.http.get<any>(tcgApiUrl+"?pageSize=20",{ headers: headers });
  }

  /**
   * Get a filtered list of cards from API based on some filters
   * @param name
   * @param page
   * @param pageSize
   */
  simpleCardSearch(name,page = 1,pageSize = 20): Observable<any>{
    if(name == "") {
      return this.http.get<any>( `${tcgApiUrl}?page=${page}&pageSize=${pageSize}`,{ headers: headers });
    } else {
      return this.http.get<any>( `${tcgApiUrl}?page=${page}&pageSize=${pageSize}&q=name:${name}`,{ headers: headers });
    }

  }

  /**
   * Get a single card from API passing an ID
   * @param id
   */
  getACard(id): Observable<any>{
    return this.http.get<any>(tcgApiUrl+"/"+id,{ headers: headers });
  }

}
