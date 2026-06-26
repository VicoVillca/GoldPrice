import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent
  ],
  exports: [
    SidebarComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
