import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { JoyasComponent } from './pages/joyas/joyas.component';
import { LeyComponent } from './pages/ley/ley.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardComponent,
    JoyasComponent,
    LeyComponent
  ],
  exports: [
    DashboardComponent,
    JoyasComponent,
    LeyComponent
  ]
})
export class AdminModule { }
