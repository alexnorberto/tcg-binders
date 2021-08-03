import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const tcgApiUrl = "https://api.pokemontcg.io/v2/cards";
const headers = new HttpHeaders().set('x-api-key', `7cf869e2-9e98-421a-b24c-e5b2e29ca855`);

@Injectable({
  providedIn: 'root'
})
export class TcgApiService {

  constructor(
    private http: HttpClient
  ) { }

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json');
    headers.append('x-api-key', '7cf869e2-9e98-421a-b24c-e5b2e29ca855');
    console.log(headers)
  }

  get(): Observable<any>{
    return this.http.get<any>(tcgApiUrl+"?pageSize=20",{ headers: headers });
  }

  simpleCardSearch(name,page = 1,pageSize = 20): Observable<any>{
    if(name == "") {
      return this.http.get<any>( `${tcgApiUrl}?page=${page}&pageSize=${pageSize}`,{ headers: headers });
    } else {
      return this.http.get<any>( `${tcgApiUrl}?page=${page}&pageSize=${pageSize}&q=name:${name}`,{ headers: headers });
    }

  }

  getACard(id): Observable<any>{
    return this.http.get<any>(tcgApiUrl+"/"+id,{ headers: headers });
  }

}
