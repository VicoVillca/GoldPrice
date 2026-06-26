import { ChangeDetectionStrategy, Component, inject, ElementRef, viewChild, AfterViewInit, effect, OnDestroy, signal } from '@angular/core';
import { GoldPriceService } from '../../../../core/services/gold-price.service';
import { MatIconModule } from '@angular/material/icon';
import { DecimalPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as d3 from 'd3';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, DecimalPipe, CommonModule, CardModule, FormsModule, InputNumberModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  goldService = inject(GoldPriceService);
  chartContainer = viewChild<ElementRef>('chartContainer');
  
  isEditingRate = signal(false);
  tempRate = signal(0);

  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    effect(() => {
      const history = this.goldService.priceHistory();
      if (history.length > 0) {
        this.renderChart();
      }
    });
  }

  toggleEditRate() {
    if (!this.isEditingRate()) {
      this.tempRate.set(this.goldService.exchangeRate());
    }
    this.isEditingRate.update(v => !v);
  }

  saveRate() {
    this.goldService.exchangeRate.set(this.tempRate());
    this.isEditingRate.set(false);
  }

  ngAfterViewInit() {
    this.resizeObserver = new ResizeObserver(() => {
      this.renderChart();
    });
    
    if (this.chartContainer()) {
      this.resizeObserver.observe(this.chartContainer()!.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private renderChart() {
    const element = this.chartContainer()?.nativeElement;
    if (!element) return;

    const data = this.goldService.priceHistory();
    if (data.length < 2) return;

    d3.select(element).selectAll('*').remove();

    const width = element.clientWidth;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scalePoint()
      .domain(data.map(d => d.date))
      .range([0, width - margin.left - margin.right]);

    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.price)! * 0.999, d3.max(data, d => d.price)! * 1.001])
      .range([height - margin.top - margin.bottom, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5));

    svg.append('g')
      .call(d3.axisLeft(y));

    const line = d3.line<{date: string, price: number}>()
      .x(d => x(d.date)!)
      .y(d => y(d.price)!);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#4f46e5')
      .attr('stroke-width', 3)
      .attr('d', line);

    svg.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.date)!)
      .attr('cy', d => y(d.price)!)
      .attr('r', 5)
      .attr('fill', '#4f46e5');
  }
}
