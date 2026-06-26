import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { TooltipModule } from 'primeng/tooltip';
import { MatIconModule } from '@angular/material/icon';

interface FontOption {
  name: string;
  category: string;
  family: string;
  weight: string;
}

@Component({
  selector: 'app-letras',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    SliderModule,
    TooltipModule,
    MatIconModule
  ],
  templateUrl: './letras.component.html',
  styleUrls: ['./letras.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LetrasComponent {
  name = 'Rosa';
  
  // Custom states
  searchQuery = signal('');
  selectedCategory = signal('Todos');
  fontSize = signal(75); // Slider value 40 - 150
  selectedBackground = signal<'grid' | 'dark' | 'light'>('grid');
  favorites = signal<string[]>([]);
  activeInspectFont = signal<FontOption | null>(null);
  copiedFontName = signal<string | null>(null);

  // Suggested preset names
  presets = ['Maria'];

  fonts: FontOption[] = [
    { name: 'Cream Cake Bold', category: 'Cursiva', family: "'Cream Cake Bold'", weight: 'bold' },
    { name: 'Script MT Bold', category: 'Cursiva', family: "'Script MT Bold'", weight: 'bold' },
    { name: 'Original Taste', category: 'Cursiva', family: "'Original Taste'", weight: 'normal' },
    { name: 'Alexandra', category: 'Cursiva', family: "'Alexandra'", weight: 'normal' },
    { name: 'Ananda Black', category: 'Caligráfica', family: "'Ananda Black'", weight: 'normal' },
    { name: 'Antonellie', category: 'Cursiva', family: "'Antonellie'", weight: 'normal' },
    { name: 'Awesome Season', category: 'Elegante', family: "'Awesome Season'", weight: 'normal' },
    { name: 'Best Valentina', category: 'Cursiva', family: "'Best Valentina'", weight: 'normal' },
    { name: 'Billion Dreams', category: 'Cursiva', family: "'Billion Dreams'", weight: 'normal' },
    { name: 'Breeze', category: 'Elegante', family: "'Breeze'", weight: 'normal' },
    { name: 'Calling Heart', category: 'Cursiva', family: "'Calling Heart'", weight: 'normal' },
    { name: 'Campana Script', category: 'Caligráfica', family: "'Campana Script'", weight: 'normal' },
    { name: 'Caranda', category: 'Cursiva', family: "'Caranda'", weight: 'normal' },
    { name: 'Catalish Huntera', category: 'Elegante', family: "'Catalish Huntera'", weight: 'normal' },
    { name: 'Dalgona', category: 'Elegante', family: "'Dalgona'", weight: 'normal' },
    { name: 'Dirtylane', category: 'Vintage / Retro', family: "'Dirtylane'", weight: 'normal' },
    { name: 'Dream Flourish', category: 'Caligráfica', family: "'Dream Flourish'", weight: 'normal' },
    { name: 'Golden Hills', category: 'Vintage / Retro', family: "'Golden Hills'", weight: 'normal' },
    { name: 'Hello Valentina', category: 'Cursiva', family: "'Hello Valentina'", weight: 'normal' },
    { name: 'Hestina', category: 'Caligráfica', family: "'Hestina'", weight: 'normal' },
    { name: 'Matisan Script', category: 'Cursiva', family: "'Matisan Script'", weight: 'normal' },
    { name: 'Michland Script', category: 'Cursiva', family: "'Michland Script'", weight: 'normal' },
    { name: 'Nature Beauty', category: 'Cursiva', family: "'Nature Beauty'", weight: 'normal' },
    { name: 'Picturama Founder', category: 'Vintage / Retro', family: "'Picturama Founder'", weight: 'normal' },
    { name: 'Ramadhan Mubarak', category: 'Elegante', family: "'Ramadhan Mubarak'", weight: 'normal' },
    { name: 'Rightland', category: 'Vintage / Retro', family: "'Rightland'", weight: 'normal' },
    { name: 'Shine in Valentine', category: 'Cursiva', family: "'Shine in Valentine'", weight: 'normal' },
    { name: 'Signatra', category: 'Cursiva', family: "'Signatra'", weight: 'normal' },
    { name: 'Simple Thread', category: 'Cursiva', family: "'Simple Thread'", weight: 'normal' },
    { name: 'The Blacklist', category: 'Elegante', family: "'The Blacklist'", weight: 'normal' },
    { name: 'White Smith', category: 'Cursiva', family: "'White Smith'", weight: 'normal' },
    { name: 'Bernadette', category: 'Cursiva', family: "'Bernadette'", weight: 'normal' }
  ];

  // Distinct categories computed for filters
  categories = ['Todos', 'Favoritos', 'Cursiva', 'Caligráfica', 'Vintage / Retro', 'Elegante'];

  // Filtered fonts computed signal
  filteredFonts = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();
    const favs = this.favorites();

    return this.fonts.filter(font => {
      // Search matches
      const matchesSearch = font.name.toLowerCase().includes(query);
      
      // Category matches
      let matchesCat = true;
      if (cat === 'Favoritos') {
        matchesCat = favs.includes(font.name);
      } else if (cat !== 'Todos') {
        matchesCat = font.category === cat;
      }

      return matchesSearch && matchesCat;
    });
  });

  selectPreset(preset: string) {
    this.name = preset;
  }

  toggleFavorite(fontName: string, event: Event) {
    event.stopPropagation();
    const favs = this.favorites();
    if (favs.includes(fontName)) {
      this.favorites.set(favs.filter(f => f !== fontName));
    } else {
      this.favorites.set([...favs, fontName]);
    }
  }

  isFavorite(fontName: string): boolean {
    return this.favorites().includes(fontName);
  }

  copyWithFont(font: FontOption) {
    const textToCopy = `Nombre: ${this.name} | Fuente: ${font.name}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      this.copiedFontName.set(font.name);
      setTimeout(() => {
        if (this.copiedFontName() === font.name) {
          this.copiedFontName.set(null);
        }
      }, 2500);
    });
  }

  inspectFont(font: FontOption) {
    this.activeInspectFont.set(font);
  }

  closeInspect() {
    this.activeInspectFont.set(null);
  }

  getBackgroundClass(): string {
    return `bg-preview-${this.selectedBackground()}`;
  }

  downloadImage(fontFamily: string, fontName: string, fontWeight = '400') {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 500;

    // Define background depending on preview
    const isDarkBg = this.selectedBackground() === 'dark';
    
    // Background filling
    if (this.selectedBackground() === 'grid') {
      // Clear transparent or modern light background for high-contrast png
      ctx.fillStyle = 'rgba(255, 255, 255, 0)';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else if (isDarkBg) {
      // Beautiful warm cream background
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${fontWeight} 140px ${fontFamily}`;

    // Strictly static eye-friendly dark slate with no shadows or gradients
    ctx.fillStyle = '#1e293b';
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    const text = this.name || 'Vista Previa';
    ctx.fillText(text, centerX, centerY);

    // Download
    const link = document.createElement('a');
    link.download = `${text.replace(/\s+/g, '_')}_${fontName}_negro.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
}

