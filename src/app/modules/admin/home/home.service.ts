import { Injectable }                       from '@angular/core';
import { HttpClient }                       from '@angular/common/http';
import { IEconomicIndicator }               from '@modules/admin/home/interface/economic-indicator.interface';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { MatSnackBar }                      from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class HomeService {
  economicIndicators$: BehaviorSubject<IEconomicIndicator> = new BehaviorSubject(undefined);

  constructor(private readonly _httpClient: HttpClient,
              private readonly matSnackBar: MatSnackBar) {
    this.getEconomicIndicators();
  }

  getEconomicIndicators() {
    if (this.economicIndicators$.value)
      return this.economicIndicators$.asObservable();

    return this._httpClient.get<IEconomicIndicator>('https://cors-anywhere.herokuapp.com/https://mindicador.cl/api')
      .pipe(
        tap((economicIndicators) => this.economicIndicators$.next(economicIndicators)),
        catchError((error) => {
          this.matSnackBar.open('Error al obtener los indicadores económicos', 'Cerrar', {
            duration          : 5000,
            horizontalPosition: 'right',
            verticalPosition  : 'top',
          });
          return null;
        })
      );
  }
}
