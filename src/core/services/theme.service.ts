import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private _isDarkMode = false;
  private readonly THEME_KEY = 'vico-theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadTheme();
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    
    if (savedTheme === 'dark') {
      this._isDarkMode = true;
      this.applyDarkTheme();
    } else if (savedTheme === 'light') {
      this._isDarkMode = false;
      this.applyLightTheme();
    } else {
      // Usar preferencia del sistema
      this._isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.applyTheme();
    }
  }

  toggleTheme(): void {
    this._isDarkMode = !this._isDarkMode;
    this.applyTheme();
    this.saveTheme();
  }

  private applyTheme(): void {
    if (this._isDarkMode) {
      this.applyDarkTheme();
    } else {
      this.applyLightTheme();
    }
  }

  private applyDarkTheme(): void {
    this.renderer.addClass(document.body, 'dark-theme');
    this.renderer.removeClass(document.body, 'light-theme');
  }

  private applyLightTheme(): void {
    this.renderer.addClass(document.body, 'light-theme');
    this.renderer.removeClass(document.body, 'dark-theme');
  }

  private saveTheme(): void {
    localStorage.setItem(this.THEME_KEY, this._isDarkMode ? 'dark' : 'light');
  }
}