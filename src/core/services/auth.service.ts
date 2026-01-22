import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/models.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  
  private readonly USER_KEY = 'vico-proyectos-user';
  
  // Lista de administradores permitidos (en producción vendría de una API)
  private readonly ADMIN_USERS = [
    { email: 'admin@test.com', password: '123456', name: 'Administrador Principal' },
    { email: 'admin@vico.com', password: 'admin123', name: 'Administrador Vico' }
  ];

  constructor(private router: Router) {
    const storedUser = localStorage.getItem(this.USER_KEY);
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<boolean> {
    // Buscar en la lista de administradores permitidos
    const adminUser = this.ADMIN_USERS.find(user => 
      user.email === email && user.password === password
    );

    if (adminUser) {
      const user: User = {
        id: Date.now(), // En producción sería un ID real
        email: email,
        name: adminUser.name,
        role: 'admin'
      };
      
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of(true).pipe(delay(500)); // Simular delay de red
    }
    
    return of(false).pipe(delay(500)); // Simular delay de red
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }

  // Para validar token en producción
  validateToken(): Observable<boolean> {
    // Aquí iría la lógica para validar token JWT
    return of(!!this.currentUserValue).pipe(delay(100));
  }
}