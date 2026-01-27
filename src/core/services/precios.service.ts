import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { DollarService } from './dollar.service';
import { GoldService } from './gold.service';
import { Dollar, GoldPriceSimple } from '../models/models.model';

@Injectable({
  providedIn: 'root'
})
export class PreciosService {
  
  constructor(
    private dollarService: DollarService,
    private goldService: GoldService
  ) {}

  /**
   * Obtiene todos los precios
   */
  getAllPrices(): Observable<{
    dolarOficial: Dollar;
    dolarBinance: Dollar;
    goldPrice: GoldPriceSimple;
  }> {
    return combineLatest([
      this.dollarService.dolarOficial$,
      this.dollarService.dolarBinance$,
      this.goldService.goldPrice$
    ]).pipe(
      map(([oficial, binance, gold]) => ({
        dolarOficial: oficial,
        dolarBinance: binance,
        goldPrice: gold
      }))
    );
  }

  /**
   * Refresca todos los precios
   */
  refreshAll(): Observable<{
    dolarOficial: Dollar;
    dolarBinance: Dollar;
    goldPrice: GoldPriceSimple;
  }> {
    return new Observable(observer => {
      let oficial: Dollar;
      let binance: Dollar;
      let gold: GoldPriceSimple;
      let count = 0;

      const checkComplete = () => {
        count++;
        if (count === 3) {
          observer.next({
            dolarOficial: oficial,
            dolarBinance: binance,
            goldPrice: gold
          });
          observer.complete();
        }
      };

      this.dollarService.getDolarOficial().subscribe({
        next: data => {
          oficial = data;
          checkComplete();
        },
        error: () => {
          oficial = this.dollarService.getCurrentOficial();
          checkComplete();
        }
      });

      this.dollarService.getDolarBinance().subscribe({
        next: data => {
          binance = data;
          checkComplete();
        },
        error: () => {
          binance = this.dollarService.getCurrentBinance();
          checkComplete();
        }
      });

      this.goldService.getGoldPrice().subscribe({
        next: data => {
          gold = data;
          checkComplete();
        },
        error: () => {
          gold = this.goldService.getCurrentGoldPrice();
          checkComplete();
        }
      });
    });
  }
}