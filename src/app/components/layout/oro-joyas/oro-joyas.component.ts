import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { ServicioPreciosMetal } from '../../../../core/services/servicio-precios-metal.service';
import { ConfiguracionMetal, PrecioJoya } from '../../../../core/models/models.model';

@Component({
  selector: 'app-oro-joyas',
  templateUrl: './oro-joyas.component.html',
  styleUrls: ['./oro-joyas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ChipModule,
    ButtonModule
  ]
})
export class OroJoyasComponent implements OnInit {
  
  // Datos quemados como en el ejemplo
  precioOnzaUSD: number = 5332.5;  // Valor quemado del ejemplo
  tipoCambioBOB: number = 8.93;    // Valor quemado del ejemplo
  descuentoBase: number = 6;       // 6% descuento base
  ajusteJoya: number = -2;         // -2% ajuste para joyería
  
  // Configuración
  configuracion!: ConfiguracionMetal;
  
  // Precios calculados
  preciosJoya: PrecioJoya[] = [];
  
  // Para las cards principales
  quilatesPrincipales = [20, 18, 14, 10];
  
  // Estado
  lastUpdate: Date = new Date();

  constructor(private servicioPrecios: ServicioPreciosMetal) {}

  ngOnInit() {
    this.calcularPrecios();
  }

  calcularPrecios(): void {
    // Crear configuración con datos quemados
    this.configuracion = this.servicioPrecios.crearConfiguracion(
      this.precioOnzaUSD,
      this.tipoCambioBOB,
      this.descuentoBase,
      this.ajusteJoya
    );
    
    // Obtener los precios para joyería
    this.preciosJoya = this.servicioPrecios.obtenerTablaPreciosJoya(this.configuracion);
    
    // Actualizar timestamp
    this.lastUpdate = new Date();
  }

  // Obtener precio específico para un quilate
  getPrecioForQuilate(quilate: number): PrecioJoya | undefined {
    return this.preciosJoya.find(p => p.quilates === quilate);
  }

  // Obtener color según quilate
  getColorForQuilate(quilate: number): string {
    switch (quilate) {
      case 20: return 'yellow';
      case 18: return 'green';
      case 14: return 'orange';
      case 10: return 'brown';
      default: return 'gray';
    }
  }

  // Obtener icono según quilate
  getIconForQuilate(quilate: number): string {
    switch (quilate) {
      case 20: return 'pi pi-star';
      case 18: return 'pi pi-star-fill';
      case 14: return 'pi pi-gem';
      case 10: return 'pi pi-shield';
      default: return 'pi pi-circle';
    }
  }

  // Formatear porcentaje para mostrar
  formatPorcentaje(valor: number): string {
    return valor.toFixed(1) + '%';
  }

  // Formatear precio
  formatPrecio(valor: number): string {
    return 'Bs. ' + valor.toFixed(2);
  }

  getLastUpdateTime(): string {
    return this.lastUpdate.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  // Método para calcular precio de pepa (ejemplo)
  calcularPrecioPepaEjemplo(): void {
    const config: ConfiguracionMetal = this.servicioPrecios.crearConfiguracion(
      this.precioOnzaUSD,
      this.tipoCambioBOB
    );
    
    // Ejemplo: calcular precio para pepa declarada 94% en condición regular
    const precioPepa = this.servicioPrecios.calcularPrecioPepa(0.94, config, 'regular');
    console.log('Precio pepa 94% regular:', precioPepa);
    
    // Obtener descuento recomendado
    const descuento = this.servicioPrecios.obtenerDescuentoRecomendadoPepa('regular', true, false);
    console.log('Descuento recomendado:', descuento + '%');
  }
}