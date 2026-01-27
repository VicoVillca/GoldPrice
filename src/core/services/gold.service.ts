import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap, shareReplay, map } from 'rxjs/operators';
import { GoldPrice, GoldPriceSimple } from '../models/models.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoldService {
  
  private goldApiUrl = environment.apiUrl; // https://gold-price.fly.dev
  
  // Subject para el precio del oro en USD
  private goldPriceSubject = new BehaviorSubject<GoldPriceSimple>(this.getDefaultGoldPrice());
  
  // Observable público
  goldPrice$ = this.goldPriceSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Obtiene el precio actual del oro en dólares (onzas troy)
   */
  getGoldPrice(): Observable<GoldPriceSimple> {
    return this.http.get<GoldPrice>(`${this.goldApiUrl}/prueba`).pipe(
      map((response: GoldPrice) => {
        if (!response.success || !response.data?.array || response.data.array.length < 2) {
          throw new Error('Respuesta inválida');
        }
        
        return {
          fecha: response.data.fecha,
          compra: response.data.array[0],
          venta: response.data.array[1]
        };
      }),
      tap((goldPrice: GoldPriceSimple) => {
        this.goldPriceSubject.next(goldPrice);
      }),
      shareReplay(1),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Obtiene el precio actual (del Subject)
   */
  getCurrentGoldPrice(): GoldPriceSimple {
    return this.goldPriceSubject.value;
  }

  /**
   * Refresca el precio manualmente
   */
  refresh(): Observable<GoldPriceSimple> {
    return this.getGoldPrice();
  }

  private getDefaultGoldPrice(): GoldPriceSimple {
    return {
      fecha: new Date().toLocaleString('es-ES'),
      compra: 0,
      venta: 0
    };
  }

  private handleError(error: any): Observable<GoldPriceSimple> {
    console.error('Error obteniendo precio del oro:', error);
    
    return new Observable(observer => {
      observer.next(this.getDefaultGoldPrice());
      observer.complete();
    });
  }
}