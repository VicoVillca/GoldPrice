import { Injectable, signal, effect } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoldPriceService {
  private readonly API_URL = environment.GOLD_PRICE_API_URL;
  
  // State
  goldPriceOnza = signal<number>(this.loadFromStorage<number>('goldPriceOnza') || 2350);
  exchangeRate = signal<number>(this.loadFromStorage<number>('exchangeRate') || 6.96);
  lastUpdated = signal<Date>(new Date(this.loadFromStorage<string>('lastUpdated') || new Date().toISOString()));
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  // Price History for Chart
  priceHistory = signal<{date: string, price: number}[]>(this.loadFromStorage<{date: string, price: number}[]>('priceHistory') || []);

  // Theme State
  isDarkMode = signal<boolean>(this.loadFromStorage<boolean>('isDarkMode') ?? false);

  constructor() {
    // Persist state changes
    effect(() => {
      this.saveToStorage('goldPriceOnza', this.goldPriceOnza());
      this.saveToStorage('exchangeRate', this.exchangeRate());
      this.saveToStorage('lastUpdated', this.lastUpdated().toISOString());
      this.saveToStorage('priceHistory', this.priceHistory());
      this.saveToStorage('isDarkMode', this.isDarkMode());
      
      // Apply theme
      if (typeof document !== 'undefined') {
        if (this.isDarkMode()) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    });
  }

  async fetchPrice() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await fetch(this.API_URL);
      if (!response.ok) throw new Error('Error al obtener el precio');
      const data = await response.json();
      
      if (data.success && data.data?.array?.length > 0) {
        const newPrice = data.data.array[0];
        this.goldPriceOnza.set(newPrice);
        this.lastUpdated.set(new Date());
        
        // Update history
        const history = [...this.priceHistory()];
        history.push({ 
          date: new Date().toLocaleTimeString(), 
          price: newPrice 
        });
        // Keep only last 10 points
        if (history.length > 10) history.shift();
        this.priceHistory.set(history);
      } else {
        throw new Error('Formato de respuesta inválido');
      }

    } catch (err) {
      this.error.set('No se pudo actualizar el precio. Usando valores locales.');
      console.error(err);
    } finally {
      this.isLoading.set(false);
    }
  }

  toggleTheme() {
    this.isDarkMode.update(v => !v);
  }

  private saveToStorage(key: string, value: unknown) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  private loadFromStorage<T>(key: string): T | null {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  }
}
