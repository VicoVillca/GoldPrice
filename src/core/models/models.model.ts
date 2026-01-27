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