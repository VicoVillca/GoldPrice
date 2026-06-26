import { ChangeDetectionStrategy, Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { GoldPriceService } from '../../../../core/services/gold-price.service';

interface RegionOro {
  id: string;
  nombre: string;
  departamento: 'La Paz' | 'Beni' | 'Santa Cruz' | 'Pando' | 'Oruro' | 'Potosí';
  ley: string;
  fotoUrl: string;
  descripcion?: string;
}

@Component({
  selector: 'app-mapa-oro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    MatIconModule
  ],
  templateUrl: './mapa-oro.component.html',
  styleUrls: ['./mapa-oro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapaOroComponent {
  goldService = inject(GoldPriceService);

  // Filters State
  searchQuery = signal<string>('');
  selectedDepartamento = signal<string>('Todos');
  selectedSort = signal<'nombre' | 'ley-desc' | 'precio-desc'>('nombre');

  // Interactive Calculator State
  selectedRegion = signal<RegionOro | null>(null);
  calculatorWeight = signal<number>(1);

  regiones: RegionOro[] = [
    // LA PAZ
    { id: '1', nombre: 'Illimani', departamento: 'La Paz', ley: '94', fotoUrl: 'https://picsum.photos/seed/illimani/400/300', descripcion: 'Región emblemática cercana al nevado Illimani con mineralización aurífera de alta ley.' },
    { id: '2', nombre: 'Puente Villa', departamento: 'La Paz', ley: '92', fotoUrl: 'https://picsum.photos/seed/puentevilla/400/300', descripcion: 'Zona de explotación tradicional en los Yungas de La Paz con ley promedio estable.' },
    { id: '3', nombre: '15 de Agosto', departamento: 'La Paz', ley: '95', fotoUrl: 'https://picsum.photos/seed/15agosto/400/300', descripcion: 'Cooperativa con excelente reputación de ley de lavado fluvial.' },
    { id: '4', nombre: 'Suches', departamento: 'La Paz', ley: '94', fotoUrl: 'https://picsum.photos/seed/suches/400/300', descripcion: 'Frontera aurífera de depósitos aluviales masivos.' },
    { id: '5', nombre: 'Consata', departamento: 'La Paz', ley: '98', fotoUrl: 'https://picsum.photos/seed/consata/400/300', descripcion: 'Una de las leyes de pureza más altas del departamento de La Paz.' },
    { id: '6', nombre: 'Cosmipata', departamento: 'La Paz', ley: '96', fotoUrl: 'https://picsum.photos/seed/cosmipata/400/300', descripcion: 'Región de montaña con filones auríferos muy bien cotizados.' },
    { id: '7', nombre: 'Mapiri', departamento: 'La Paz', ley: '95', fotoUrl: 'https://picsum.photos/seed/mapiri/400/300', descripcion: 'Zona de gran tradición minera aluvial en el norte paceño.' },
    { id: '8', nombre: 'Tipuani', departamento: 'La Paz', ley: '96', fotoUrl: 'https://picsum.photos/seed/tipuani/400/300', descripcion: 'Histórica capital del oro aluvial de altísima ley en Bolivia.' },
    { id: '9', nombre: 'Guanay', departamento: 'La Paz', ley: '94', fotoUrl: 'https://picsum.photos/seed/guanay/400/300', descripcion: 'Punto de confluencia fluvial con importante rescate de oro comercial.' },
    { id: '10', nombre: 'Teoponte', departamento: 'La Paz', ley: '95', fotoUrl: 'https://picsum.photos/seed/teoponte/400/300', descripcion: 'Declarada reserva fiscal minera con gran concentración de pepitas.' },
    { id: '11', nombre: 'Apolo', departamento: 'La Paz', ley: '90', fotoUrl: 'https://picsum.photos/seed/apolo/400/300', descripcion: 'Parque madidi colindante, explotación regulada con ley promedio de 90.' },
    { id: '12', nombre: 'Pelechuco', departamento: 'La Paz', ley: '91', fotoUrl: 'https://picsum.photos/seed/pelechuco/400/300', descripcion: 'Depósitos fluviales de altura en las cabeceras andinas.' },
    { id: '13', nombre: 'Sorata', departamento: 'La Paz', ley: '92', fotoUrl: 'https://picsum.photos/seed/sorata/400/300', descripcion: 'Valles profundos con yacimientos fluviales y betas primarias.' },
    { id: '14', nombre: 'Arcopongo', departamento: 'La Paz', ley: '97', fotoUrl: 'https://picsum.photos/seed/arcopongo/400/300', descripcion: 'Yacimiento de altísima ley descubierto recientemente con gran pureza.' },
    { id: '15', nombre: 'Choquecamata', departamento: 'La Paz', ley: '89', fotoUrl: 'https://picsum.photos/seed/choquecamata/400/300', descripcion: 'Límites andinos de tradición prehispánica.' },
    { id: '16', nombre: 'Yani', departamento: 'La Paz', ley: '96', fotoUrl: 'https://picsum.photos/seed/yani/400/300', descripcion: 'Camino del oro precolombino con ley de joyería fina.' },
    { id: '17', nombre: 'Aucapata', departamento: 'La Paz', ley: '90', fotoUrl: 'https://picsum.photos/seed/aucapata/400/300', descripcion: 'Región de los Yungas altos con depósitos primarios.' },
    { id: '18', nombre: 'Caranavi', departamento: 'La Paz', ley: '88', fotoUrl: 'https://picsum.photos/seed/caranavi/400/300', descripcion: 'Puerta a la amazonía con depósitos de arrastre fluvial.' },
    { id: '19', nombre: 'Inquisivi', departamento: 'La Paz', ley: '91', fotoUrl: 'https://picsum.photos/seed/inquisivi/400/300', descripcion: 'Venas de cuarzo aurífero en la cordillera oriental.' },

    // BENI
    { id: '20', nombre: 'Riberalta (Río Madre de Dios)', departamento: 'Beni', ley: '93', fotoUrl: 'https://picsum.photos/seed/riberalta/400/300', descripcion: 'Balsas de succión sobre el gran río con ley estándar amazónica.' },
    { id: '21', nombre: 'Guayaramerín', departamento: 'Beni', ley: '91', fotoUrl: 'https://picsum.photos/seed/guayaramerin/400/300', descripcion: 'Frontera fluvial con depósitos finos de aluvión.' },
    { id: '22', nombre: 'Cachuela Esperanza', departamento: 'Beni', ley: '92', fotoUrl: 'https://picsum.photos/seed/cachuela/400/300', descripcion: 'Depósitos históricos formados por raudales del río Beni.' },
    { id: '23', nombre: 'San Simón', departamento: 'Beni', ley: '96', fotoUrl: 'https://picsum.photos/seed/sansimon/400/300', descripcion: 'Serranía con ricas vetas auríferas explotadas de alta pureza.' },

    // SANTA CRUZ
    { id: '24', nombre: 'San Ramón', departamento: 'Santa Cruz', ley: '91', fotoUrl: 'https://picsum.photos/seed/sanramon/400/300', descripcion: 'Yacimiento clásico del precámbrico cruceño con oro nativo.' },
    { id: '25', nombre: 'San Javier', departamento: 'Santa Cruz', ley: '90', fotoUrl: 'https://picsum.photos/seed/sanjavier/400/300', descripcion: 'Explotación verde regulada en el oriente de Santa Cruz.' },
    { id: '26', nombre: 'Concepción', departamento: 'Santa Cruz', ley: '89', fotoUrl: 'https://picsum.photos/seed/concepcion/400/300', descripcion: 'Serranías chiquitanas con vetas de cuarzo y oro diseminado.' },

    // PANDO
    { id: '27', nombre: 'Río Orthon', departamento: 'Pando', ley: '93', fotoUrl: 'https://picsum.photos/seed/orthon/400/300', descripcion: 'Lavados fluviales en las profundidades de la selva pandina.' },
    { id: '28', nombre: 'Río Madre de Dios (Pando)', departamento: 'Pando', ley: '94', fotoUrl: 'https://picsum.photos/seed/madrededios/400/300', descripcion: 'Oro sumamente fino de alta ley recolectado artesanalmente.' },

    // ORURO
    { id: '29', nombre: 'Kori Kollo (La Joya)', departamento: 'Oruro', ley: '85', fotoUrl: 'https://picsum.photos/seed/korikollo/400/300', descripcion: 'Explotación minera industrial clásica a cielo abierto.' },
    { id: '30', nombre: 'Kori Chaca', departamento: 'Oruro', ley: '84', fotoUrl: 'https://picsum.photos/seed/korichaca/400/300', descripcion: 'Depósitos de lixiviación y oro fino de Oruro.' },

    // POTOSI
    { id: '31', nombre: 'Tupiza', departamento: 'Potosí', ley: '87', fotoUrl: 'https://picsum.photos/seed/tupiza/400/300', descripcion: 'Lavaderos andinos del sur con ley promedio moderada.' },
    { id: '32', nombre: 'San Cristóbal', departamento: 'Potosí', ley: '85', fotoUrl: 'https://picsum.photos/seed/sancristobal/400/300', descripcion: 'Región de polimetálicos con recuperación secundaria de oro fino.' }
  ];

  // Unique list of departments for the chips
  departamentos = ['Todos', 'La Paz', 'Beni', 'Santa Cruz', 'Pando', 'Oruro', 'Potosí'];

  // Signal computed for the filtered list
  filteredRegiones = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const dept = this.selectedDepartamento();
    const sortBy = this.selectedSort();

    const list = this.regiones.filter(region => {
      const matchesSearch = region.nombre.toLowerCase().includes(query) ||
                            region.ley.toLowerCase().includes(query);
      const matchesDept = dept === 'Todos' || region.departamento === dept;
      return matchesSearch && matchesDept;
    });

    // Sort logic
    if (sortBy === 'nombre') {
      list.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (sortBy === 'ley-desc') {
      list.sort((a, b) => {
        const leyA = parseFloat(a.ley.split('/')[0]);
        const leyB = parseFloat(b.ley.split('/')[0]);
        return leyB - leyA;
      });
    } else if (sortBy === 'precio-desc') {
      list.sort((a, b) => {
        return this.calculatePrice(b.ley) - this.calculatePrice(a.ley);
      });
    }

    return list;
  });

  // Calculate dynamic price per gram
  calculatePrice(leyStr: string): number {
    const leyValue = parseFloat(leyStr.split('/')[0]);
    if (isNaN(leyValue) || leyValue <= 0) return 0;

    const onza = this.goldService.goldPriceOnza();
    const exchange = this.goldService.exchangeRate();
    
    // (Onza / 31.1035) * (Ley / 100) * ExchangeRate
    return (onza / 31.1035) * (leyValue / 100) * exchange;
  }

  // Calculate price for the custom weight entered in the calculator
  calculateCustomPrice(leyStr: string): number {
    const pricePerGram = this.calculatePrice(leyStr);
    const weight = this.calculatorWeight();
    return pricePerGram * (weight > 0 ? weight : 0);
  }

  openCalculator(region: RegionOro) {
    this.selectedRegion.set(region);
    this.calculatorWeight.set(1);
  }

  closeCalculator() {
    this.selectedRegion.set(null);
  }
}
