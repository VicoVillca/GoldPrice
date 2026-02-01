import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { ServicioPreciosMetal } from '../../../../core/services/servicio-precios-metal.service';
import { ConfiguracionMetal, PrecioJoya } from '../../../../core/models/models.model';
import { DollarService } from '../../../../core/services/dollar.service';
import { GoldService } from '../../../../core/services/gold.service';

@Component({
  selector: 'app-oro-joyas',
  templateUrl: './oro-joyas.component.html',
  styleUrls: ['./oro-joyas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ChipModule
  ]
})
export class OroJoyasComponent implements OnInit {
  
  // Valores fijos
  precioOnzaUSD: number = 5332.5;
  tipoCambioBOB: number = 8.93;
  descuentoBase: number = 6;
  ajusteJoya: number = -2;
  
  // Configuración
  configuracion!: ConfiguracionMetal;
  
  // Precios calculados
  preciosJoya: PrecioJoya[] = [];
  
  // Quilates para mostrar en las cards
  quilatesPrincipales = [20, 18, 14, 10];

  constructor(
    private servicioPrecios: ServicioPreciosMetal,
    private dollarService: DollarService,
    private goldService: GoldService,
  ) {}

  ngOnInit() {
          // Dólar Binance
      this.dollarService.dolarBinance$.subscribe(dolar => {
        this.tipoCambioBOB = dolar.venta;
        this.calcularPrecios();
        //this.lastUpdate = new Date();
      }),

      
      // Precio del oro
      this.goldService.goldPrice$.subscribe(gold => {
        this.precioOnzaUSD = gold.venta;
        this.calcularPrecios();
        //this.lastUpdate = new Date();
      })
  }

  /**
   * Calcula los precios de joyería usando el servicio
   */
  calcularPrecios(): void {
    // Crear configuración con datos fijos
    this.configuracion = this.servicioPrecios.crearConfiguracion(
      this.precioOnzaUSD,
      this.tipoCambioBOB,
      this.descuentoBase,
      this.ajusteJoya
    );
    
    // Obtener precios de joyería
    this.preciosJoya = this.servicioPrecios.obtenerTablaPreciosJoya(this.configuracion);
  }

  /**
   * Obtiene el precio para un quilate específico
   */
  getPrecioForQuilate(quilate: number): PrecioJoya | undefined {
    return this.preciosJoya.find(p => p.quilates === quilate);
  }

  /**
   * Calcula precio con descuento aplicado
   */
  calcularPrecioConDescuento(precioBase: number, porcentajeDescuento: number): number {
    return precioBase * (1 - porcentajeDescuento / 100);
  }

  /**
   * Asigna colores según el quilate para estilos
   */
  getColorForQuilate(quilate: number): string {
    const colores: {[key: number]: string} = {
      20: 'yellow',
      18: 'green',
      14: 'orange',
      10: 'brown'
    };
    return colores[quilate] || 'gray';
  }

  /**
   * Formatea precios a string con moneda
   */
  formatPrecio(valor: number): string {
    return `Bs. ${valor.toFixed(2)}`;
  }
}