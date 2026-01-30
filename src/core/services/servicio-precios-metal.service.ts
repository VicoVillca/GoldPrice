import { Injectable } from '@angular/core';
import { ConfiguracionMetal, PrecioJoya, PrecioPorLey } from '../models/models.model';


@Injectable({
  providedIn: 'root'
})
export class ServicioPreciosMetal {
  
  private readonly GRAMOS_POR_ONZA_TROY = 31.1035;
  
  // Tabla de conversión quilates a porcentaje
  private quilatesAPorcentaje: { [key: number]: number } = {
    20: 83.33,
    18: 75.000,
    14: 58.333,
    10: 41.667
  };
  
  // Pérdida por soldadura según quilate
  private perdidaSoldaduraPorQuilate: { [key: number]: number } = {
    20: 1.0,
    18: 1.5,
    14: 2.0,
    10: 2.5
  };

  constructor() { }

  /**
   * OBTENER TABLA DE PRECIOS POR LEY
   * @param config Configuración con precios y tipo de cambio
   * @returns Lista de precios calculados por cada ley
   */
  obtenerTablaPreciosPorLey(config: ConfiguracionMetal): PrecioPorLey[] {
    const precioPuroPorGramoBOB = this.calcularPrecioPuroPorGramoBOB(config);
    const precioPuroPorGramoUSD = this.calcularPrecioPuroPorGramoUSD(config);
    const leyes = this.generarLeyesComunes();
    
    return leyes.map(ley => 
      this.calcularPrecioParaLey(ley, config, precioPuroPorGramoBOB, precioPuroPorGramoUSD)
    );
  }

  /**
   * OBTENER TABLA DE PRECIOS PARA JOYERÍA
   * @param config Configuración con precios y tipo de cambio
   * @returns Lista de precios calculados por cada quilate
   */
  obtenerTablaPreciosJoya(config: ConfiguracionMetal): PrecioJoya[] {
    const precioPuroPorGramoBOB = this.calcularPrecioPuroPorGramoBOB(config);
    const quilates = [20, 18, 14, 10];
    
    return quilates.map(quilate => 
      this.calcularPrecioParaJoya(quilate, config, precioPuroPorGramoBOB)
    );
  }

  /**
   * CREAR CONFIGURACIÓN PERSONALIZADA
   * @param precioOnzaTroyUSD Precio de la onza Troy en USD
   * @param tipoCambioUSDaBOB Tipo de cambio USD a BOB
   * @param descuentoBase Descuento base en porcentaje (opcional, default: 6)
   * @param ajusteJoya Ajuste para joyería en porcentaje (opcional, default: -2)
   * @returns Configuración completa
   */
  crearConfiguracion(
    precioOnzaTroyUSD: number,
    tipoCambioUSDaBOB: number,
    descuentoBase: number = 6,
    ajusteJoya: number = -2
  ): ConfiguracionMetal {
    return {
      precioOnzaTroyUSD,
      tipoCambioUSDaBOB,
      descuentoBase,
      ajusteJoya
    };
  }

  /**
   * CALCULAR PRECIO PARA MATERIAL EN PEPA (sin fundir)
   * @param leyDeclarada Ley que declara el minero (ej: 0.94 = 94%)
   * @param config Configuración de precios
   * @param condicionMaterial Condición del material
   * @returns Precio a pagar por gramo
   */
  calcularPrecioPepa(
    leyDeclarada: number,
    config: ConfiguracionMetal,
    condicionMaterial: 'excelente' | 'buena' | 'regular' | 'mala' = 'regular'
  ): number {
    // Descuento según condición del material
    const descuentos = {
      'excelente': 6,   // 6% descuento
      'buena': 8,       // 8% descuento
      'regular': 10,    // 10% descuento
      'mala': 15        // 15% descuento
    };
    
    const descuento = descuentos[condicionMaterial];
    const leyAPagar = leyDeclarada * (1 - descuento / 100);
    const precioPuroPorGramoBOB = this.calcularPrecioPuroPorGramoBOB(config);
    
    return this.redondearADosDecimales(precioPuroPorGramoBOB * leyAPagar);
  }

  /**
   * OBTENER DESCUENTO RECOMENDADO PARA PEPA
   * @param condicionMaterial Condición del material
   * @param tieneTierra Si el material tiene tierra/barro
   * @param estaHumedo Si el material está húmedo
   * @returns Descuento recomendado en porcentaje
   */
  obtenerDescuentoRecomendadoPepa(
    condicionMaterial: 'excelente' | 'buena' | 'regular' | 'mala',
    tieneTierra: boolean = false,
    estaHumedo: boolean = false
  ): number {
    const descuentoBase = {
      'excelente': 6,
      'buena': 8,
      'regular': 10,
      'mala': 15
    }[condicionMaterial];
    
    let descuentoTotal = descuentoBase;
    if (tieneTierra) descuentoTotal += 3;
    if (estaHumedo) descuentoTotal += 5;
    
    // Limitar entre 5% y 30%
    return Math.min(30, Math.max(5, descuentoTotal));
  }

  // ========== MÉTODOS PRIVADOS DE CÁLCULO ==========

  private calcularPrecioPuroPorGramoUSD(config: ConfiguracionMetal): number {
    return config.precioOnzaTroyUSD / this.GRAMOS_POR_ONZA_TROY;
  }

  private calcularPrecioPuroPorGramoBOB(config: ConfiguracionMetal): number {
    const precioUSD = this.calcularPrecioPuroPorGramoUSD(config);
    return precioUSD * config.tipoCambioUSDaBOB;
  }

  private generarLeyesComunes(): number[] {
    // Leyes específicas solicitadas
    const leyesEspecificas = [1.0, 0.995, 0.99, 0.985, 0.98];
    
    // Leyes adicionales comunes
    const leyesAdicionales = [
      0.975, 0.97, 0.965, 0.96, 0.955, 0.95, 0.945, 0.94, 0.935, 0.93,
      0.925, 0.92, 0.915, 0.91, 0.905, 0.90, 0.85, 0.80, 0.75, 0.70,
      0.60, 0.50
    ];
    
    return [...leyesEspecificas, ...leyesAdicionales].sort((a, b) => b - a);
  }

  private calcularPrecioParaLey(
    ley: number,
    config: ConfiguracionMetal,
    precioPuroBOB: number,
    precioPuroUSD: number
  ): PrecioPorLey {
    const leyNormalizada = Math.max(0, Math.min(1, ley));
    const precioPorGramoBOB = precioPuroBOB * leyNormalizada;
    const precioPorGramoUSD = precioPuroUSD * leyNormalizada;
    
    return {
      ley: leyNormalizada,
      milesimas: leyNormalizada * 1000,
      precioPorGramoBOB: this.redondearADosDecimales(precioPorGramoBOB),
      precioPorGramoConDescuentoBOB: this.redondearADosDecimales(
        precioPorGramoBOB * (1 - config.descuentoBase / 100)
      ),
      precioPorGramoUSD: this.redondearADosDecimales(precioPorGramoUSD),
      precioPorOnzaBOB: this.redondearADosDecimales(precioPorGramoBOB * this.GRAMOS_POR_ONZA_TROY),
      precioPorOnzaUSD: this.redondearADosDecimales(precioPorGramoUSD * this.GRAMOS_POR_ONZA_TROY)
    };
  }

  private calcularPrecioParaJoya(
    quilate: number,
    config: ConfiguracionMetal,
    precioPuroBOB: number
  ): PrecioJoya {
    const porcentajeTeorico = this.quilatesAPorcentaje[quilate];
    const porcentajeAjustado = Math.max(0, porcentajeTeorico + config.ajusteJoya);
    const precioPorGramoBOB = precioPuroBOB * (porcentajeAjustado / 100);
    const perdidaSoldadura = this.perdidaSoldaduraPorQuilate[quilate];
    
    return {
      quilates: quilate,
      porcentajeTeorico: this.redondearATresDecimales(porcentajeTeorico),
      porcentajeAjustado: this.redondearATresDecimales(porcentajeAjustado),
      precioPorGramoBOB: this.redondearADosDecimales(precioPorGramoBOB),
      precioPorGramoConDescuentoBOB: this.redondearADosDecimales(
        precioPorGramoBOB * (1 - config.descuentoBase / 100)
      ),
      perdidaSoldadura: perdidaSoldadura,
      precioFinalPorGramoBOB: this.redondearADosDecimales(
        precioPorGramoBOB * (1 - config.descuentoBase / 100) * (1 - perdidaSoldadura / 100)
      )
    };
  }

  // Métodos de redondeo
  private redondearADosDecimales(valor: number): number {
    return Math.round(valor * 100) / 100;
  }

  private redondearATresDecimales(valor: number): number {
    return Math.round(valor * 1000) / 1000;
  }
}