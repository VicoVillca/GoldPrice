import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-oro-ley',
  templateUrl: './oro-ley.component.html',
  styleUrls: ['./oro-ley.component.scss'],
  standalone: true,
  imports: [
        CommonModule,
        TableModule,
        CardModule,
        ChipModule,
        ButtonModule
  ]
})
export class OroLeyComponent {
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