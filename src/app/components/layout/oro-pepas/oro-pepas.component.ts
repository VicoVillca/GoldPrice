import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-oro-pepas',
  templateUrl: './oro-pepas.component.html',
  styleUrls: ['./oro-pepas.component.scss'],
  standalone: true,
  imports: [
        CommonModule,
        TableModule,
        CardModule,
        ChipModule,
        ButtonModule
  ]
})
export class OroPepasComponent {
  lastUpdate: Date = new Date();

  constructor() {}

    ngOnInit() {
    this.calcularPrecios();
  }

    calcularPrecios(): void {
    
  }
    getLastUpdateTime(): string {
    return this.lastUpdate.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
}