import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HolderModel } from '../../base/model/holder.model';
import { Currency } from '../model/currency.model';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

    private url = 'http://localhost:5000/currency';

    constructor(private httpClient: HttpClient) { }
  
    getCurrencyPage(page?: number, max_results?: number): Observable<HolderModel<Currency>> {
        let params = new HttpParams();

        if (!!page) {
          params = params.append('page', page.toString());
        }
        if (!!max_results) {
          params = params.append('max_results', max_results.toString());
        }
        return this.httpClient.get<HolderModel<Currency>>(this.url, {params: params});
    }

    getCurrency(id: number): Observable<Currency> {
        return this.httpClient.get<Currency>(this.url + '/' + id);
    }
}
