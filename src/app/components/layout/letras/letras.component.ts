import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-letras',
  templateUrl: './letras.component.html',
  styleUrls: ['./letras.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class LetrasComponent {

  constructor() {}
}