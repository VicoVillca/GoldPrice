import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-componente2',
  templateUrl: './componente2.component.html',
  styleUrls: ['./componente2.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class Componente2Component {

  constructor() {}
}