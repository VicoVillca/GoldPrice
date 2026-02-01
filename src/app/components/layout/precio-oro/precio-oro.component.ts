import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DollarService } from '../../../../core/services/dollar.service';
import { GoldService } from '../../../../core/services/gold.service';
import { PreciosService } from '../../../../core/services/precios.service';
import { Dollar, GoldPriceSimple } from '../../../../core/models/models.model';

@Component({
  selector: 'app-precio-oro',
  templateUrl: './precio-oro.component.html',
  styleUrls: ['./precio-oro.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class PrecioOroComponent implements OnInit{
  // Datos del dólar
  dolarOficial: Dollar | null = null;
  dolarBinance: Dollar | null = null;
  
  // Datos del oro
  goldPrice: GoldPriceSimple | null = null;
  
  loading = false;
  lastUpdate: Date = new Date();

  constructor(
    private dollarService: DollarService,
    private goldService: GoldService,
    private preciosService: PreciosService
  ) {
    this.dollarService.dolarOficial$.subscribe(dolar => {
        this.dolarOficial = dolar;
        this.lastUpdate = new Date();
      }),
      
      // Dólar Binance
      this.dollarService.dolarBinance$.subscribe(dolar => {
        this.dolarBinance = dolar;
        this.lastUpdate = new Date();
      }),

      
      // Precio del oro
      this.goldService.goldPrice$.subscribe(gold => {
        this.goldPrice = gold;
        this.lastUpdate = new Date();
      })
  }

  ngOnInit() {
    // Cargar datos iniciales
    this.calcularPrecios();
    this.loadInitialData();
  }

  loadInitialData() {
    console.log('Cargando datos iniciales...');
    this.loading = true;
    
    this.preciosService.getAllPrices().subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  calcularPrecios() {
    this.loading = true;
    
    this.preciosService.refreshAll().subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // MÉTODOS EXISTENTES
  getGoldCompra(): number {
    return this.goldPrice?.compra || 0;
  }

  getGoldVenta(): number {
    return this.goldPrice?.venta || 0;
  }

  getOficialCompra(): number {
    return this.dolarOficial?.compra || 0;
  }

  getOficialVenta(): number {
    return this.dolarOficial?.venta || 0;
  }

  getBinanceCompra(): number {
    return this.dolarBinance?.compra || 0;
  }

  getBinanceVenta(): number {
    return this.dolarBinance?.venta || 0;
  }

  getLastUpdateTime(): string {
    return this.lastUpdate.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  openKitkoPage(): void {
    window.open('https://www.kitco.com/charts/gold', '_blank', 'noopener,noreferrer');
  }

  openBNBPage(): void {
    window.open('https://www.bcb.gob.bo/?q=cotizaciones_tc', '_blank', 'noopener,noreferrer');
  }

  openBinancePage():void {
    window.open('https://dolarboliviahoy.com/', '_blank', 'noopener,noreferrer');
  }
}