import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, tap, shareReplay } from 'rxjs/operators';
import { Dollar, ExchangeServiceResponse } from '../models/models.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DollarService {
  
  private dollarApiUrl = environment.dollarApiUrl;
  private binanceApiUrl = 'https://api.allorigins.win/raw?url=' + 
    encodeURIComponent(environment.binanceApiUrl);
  
  private dolarOficialSubject = new BehaviorSubject<Dollar>(this.getDefaultDollar('oficial'));
  private dolarBinanceSubject = new BehaviorSubject<Dollar>(this.getDefaultDollar('binance'));
  private dolarSystemSubject = new BehaviorSubject<Dollar>(this.getDefaultDollar('system'));
  
  dolarOficial$ = this.dolarOficialSubject.asObservable();
  dolarBinance$ = this.dolarBinanceSubject.asObservable();
  dolarSystem$ = this.dolarSystemSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Obtiene dólar oficial
   */
  getDolarOficial(): Observable<Dollar> {
    return this.http.get<Dollar>(`${this.dollarApiUrl}/oficial`).pipe(
      tap((dollar: Dollar) => {
        this.dolarOficialSubject.next(dollar);
      }),
      shareReplay(1),
      catchError(error => this.handleError(error, 'oficial'))
    );
  }

  /**
   * Obtiene dólar Binance
   */
getDolarBinance(): Observable<Dollar> {
    return this.http.get<ExchangeServiceResponse>(this.binanceApiUrl).pipe(
      map(response => {
        console.log(response);
        const binanceData = response.exchangeData.find(exchange => exchange.name === 'Binance');
        
        if (!binanceData) {
          throw new Error('Datos de Binance no encontrados en la respuesta');
        }
        
        const dollar: Dollar = {
          compra: binanceData.buy,
          venta: binanceData.sell,
          casa: 'Binance',
          nombre: 'Binance P2P',
          moneda: 'USD',
          fechaActualizacion: new Date().toISOString()
        };
        
        return dollar;
      }),
      
      // Tap para actualizar los subjects
      tap((dollar: Dollar) => {
        this.dolarBinanceSubject.next(dollar);

        // Crear dollarSystem con ajuste de -1 como antes
        let dollarSystem = { ...dollar };
        dollarSystem.casa = 'system';
        dollarSystem.nombre = 'Dólar System';
        dollarSystem.compra = dollar.compra ? dollar.compra - 1 : dollar.compra;
        dollarSystem.venta = dollar.venta ? dollar.venta - 1 : dollar.venta;
        this.dolarSystemSubject.next(dollarSystem);
      }),
      
      shareReplay(1),
      
      catchError(error => this.handleError(error, 'binance'))
    );
  }

  /**
   * Obtiene ambos dólares
   */
  getAllDolares(): Observable<Dollar[]> {
    return new Observable(observer => {
      let oficial: Dollar | null = null;
      let binance: Dollar | null = null;
      let count = 0;

      const checkComplete = () => {
        count++;
        if (count === 2) {
          observer.next([oficial!, binance!]);
          observer.complete();
        }
      };

      this.getDolarOficial().subscribe({
        next: data => {
          oficial = data;
          checkComplete();
        },
        error: () => {
          oficial = this.getDefaultDollar('oficial');
          checkComplete();
        }
      });

      this.getDolarBinance().subscribe({
        next: data => {
          binance = data;
          checkComplete();
        },
        error: () => {
          binance = this.getDefaultDollar('binance');
          checkComplete();
        }
      });
    });
  }

  /**
   * Obtiene valor actual del dólar oficial
   */
  getCurrentOficial(): Dollar {
    return this.dolarOficialSubject.value;
  }

  /**
   * Obtiene valor actual del dólar Binance
   */
  getCurrentBinance(): Dollar {
    return this.dolarBinanceSubject.value;
  }

  /**
   * Obtiene valor actual del dólar Systema
   */
  getCurrentSystem(): Dollar {
    return this.dolarSystemSubject.value;
  }

  /**
   * Refresca ambos dólares
   */
  refresh(): Observable<Dollar[]> {
    return this.getAllDolares();
  }

  private getDefaultDollar(tipo: string): Dollar {
    const casaValue = tipo === 'oficial' ? 'oficial' : 'binance';
    const nombreValue = tipo === 'oficial' ? 'Dólar Oficial' : 'Dólar Binance';
    
    return {
      compra: 0,
      venta: 0,
      casa: casaValue,
      nombre: nombreValue,
      moneda: 'USD',
      fechaActualizacion: new Date().toISOString()
    };
  }

  private handleError(error: any, tipo: string): Observable<Dollar> {
    console.error(`Error dólar ${tipo}:`, error);
    
    return new Observable(observer => {
      observer.next(this.getDefaultDollar(tipo));
      observer.complete();
    });
  }
}