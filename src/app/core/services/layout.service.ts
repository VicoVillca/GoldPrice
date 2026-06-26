import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  isCollapsed = signal(this.loadFromStorage('isCollapsed') ?? false);
  isMobileOpen = signal(false);

  toggleCollapse() {
    if (typeof window !== 'undefined' && window.innerWidth < 992) {
      this.isMobileOpen.update(v => !v);
    } else {
      this.isCollapsed.update(v => !v);
      this.saveToStorage('isCollapsed', this.isCollapsed());
      this.updateSidebarWidth();
    }
  }

  toggleMobile() {
    this.isMobileOpen.update(v => !v);
  }

  private updateSidebarWidth() {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--sidebar-width', this.isCollapsed() ? '80px' : '260px');
    }
  }

  private saveToStorage(key: string, value: boolean) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  private loadFromStorage(key: string): boolean | null {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  }
}
