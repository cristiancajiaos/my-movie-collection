import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MainModule } from '../views/main/main.module';

import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from '../views/auth/auth.module';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    MainModule,
    AuthModule,
    LayoutRoutingModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
