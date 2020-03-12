import { Injectable } from '@angular/core';
import { Exchange } from '../model/exchange.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HolderModel } from '../../base/model/holder.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

    private url = 'http://localhost:5000/exchange';

    constructor(private httpClient: HttpClient) { }
  
    getExchangePage(page?: number, max_results?: number): Observable<HolderModel<Exchange>> {
        let params = new HttpParams();

        if (!!page) {
          params = params.append('page', page.toString());
        }
        if (!!max_results) {
          params = params.append('max_results', max_results.toString());
        }
        return this.httpClient.get<HolderModel<Exchange>>(this.url, {params: params});
    }

    getExchange(id: number): Observable<Exchange> {
        return this.httpClient.get<Exchange>(this.url + '/' + id);
    }
}
