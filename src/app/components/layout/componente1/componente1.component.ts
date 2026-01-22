import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-componente1',
  templateUrl: './componente1.component.html',
  styleUrls: ['./componente1.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class Componente1Component {

  constructor() {}
}