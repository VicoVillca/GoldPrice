import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-oro-pepas',
  templateUrl: './oro-pepas.component.html',
  styleUrls: ['./oro-pepas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule
  ]
})
export class OroPepasComponent {

  pepas = [
    { codigo: 'P-001', peso: 5.2, pureza: '24K', procedencia: 'Minera XYZ', estado: 'Disponible', precio: 2850.50 },
    { codigo: 'P-002', peso: 3.8, pureza: '22K', procedencia: 'Minera ABC', estado: 'Vendido', precio: 2100.75 },
    { codigo: 'P-003', peso: 7.5, pureza: '24K', procedencia: 'Minera XYZ', estado: 'Disponible', precio: 4125.00 },
    { codigo: 'P-004', peso: 2.3, pureza: '18K', procedencia: 'Minera DEF', estado: 'Reservado', precio: 1200.25 },
    { codigo: 'P-005', peso: 6.1, pureza: '24K', procedencia: 'Minera XYZ', estado: 'Disponible', precio: 3355.50 },
    { codigo: 'P-006', peso: 4.2, pureza: '22K', procedencia: 'Minera GHI', estado: 'Disponible', precio: 2310.00 },
  ];

  calcularPesoTotal(): number {
    return this.pepas.reduce((total, pepa) => total + pepa.peso, 0);
  }

  calcularValorTotal(): number {
    return this.pepas.reduce((total, pepa) => total + pepa.precio, 0);
  }

  contarDisponibles(): number {
    return this.pepas.filter(pepa => pepa.estado === 'Disponible').length;
  }
}