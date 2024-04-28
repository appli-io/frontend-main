import { Injectable }         from '@angular/core';
import { HttpClient }         from '@angular/common/http';
import { IEconomicIndicator } from '@modules/admin/home/interface/economic-indicator.interface';

@Injectable({providedIn: 'root'})
export class HomeService {

  constructor(private readonly _httpClient: HttpClient) { }

  getEconomicIndicators() {
    return this._httpClient.get<IEconomicIndicator>('https://cors-anywhere.herokuapp.com/https://mindicador.cl/api');
  }
}
