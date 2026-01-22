import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule],
  providers: [MessageService]
})
export class AppComponent {
  title = 'Vico-Proyectos';
  
  // El AppComponent solo maneja el router-outlet
  // La lógica de la aplicación está en los componentes hijos
}