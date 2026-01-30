export interface User {
  id: number;
  usuario: string;
  name: string;
  role: 'admin'; // Solo administradores
}

export interface Dollar {
  compra: number,
  venta: number,
  casa: string,
  nombre: string,
  moneda: string,
  fechaActualizacion: string
}


export interface GoldPrice {
  success: boolean;
  data: {
    fecha: string;
    array: number[]; // [precio_compra, precio_venta]
  };
}

export interface GoldPriceSimple {
  fecha: string;
  compra: number; // onza de oro
  venta: number;  // onza de oro
}


// Interfaz para cada exchange/casa de cambio
export interface ExchangeData {
  name: string;
  buy: number;
  sell: number;
  url: string;
  logo: string;
  bestSell: boolean;
  bestBuy: boolean;
}

// Interfaz para tasas de cambio de otras monedas
export interface Rate {
  fiat: string;
  usdEquivalent: number;
  usdSellEquivalent: number;
  bobEquivalent: number;
  bobSellEquivalent: number;
  usdPerUnit: number;
}

// Interfaz principal que representa la respuesta completa del servicio
export interface ExchangeServiceResponse {
  sellAveragePrice: number;
  buyAveragePrice: number;
  exchangeData: ExchangeData[];
  rates: Rate[];
}

/// Configuración para cálculos de metales
export interface ConfiguracionMetal {
  precioOnzaTroyUSD: number;      // Precio de la onza Troy en USD
  tipoCambioUSDaBOB: number;     // Tipo de cambio USD a BOB
  descuentoBase: number;         // Descuento base (ej: 6%)
  ajusteJoya: number;            // Ajuste para joyería (ej: -2%)
}

export interface PrecioPorLey {
  ley: number;                   // Ej: 0.94 = 94%
  milesimas: number;            // Milésimas (ej: 940)
  precioPorGramoBOB: number;
  precioPorGramoConDescuentoBOB: number;
  precioPorGramoUSD: number;
  precioPorOnzaBOB: number;
  precioPorOnzaUSD: number;
}

export interface PrecioJoya {
  quilates: number;             // 24, 18, 14, 10
  porcentajeTeorico: number;    // % teórico de oro
  porcentajeAjustado: number;   // % con ajuste por soldadura
  precioPorGramoBOB: number;
  precioPorGramoConDescuentoBOB: number;
  perdidaSoldadura: number;     // Pérdida por soldadura (%)
  precioFinalPorGramoBOB: number; // Precio final
}