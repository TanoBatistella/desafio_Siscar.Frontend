import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary" class="app-toolbar">
        <button mat-icon-button (click)="drawer.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>{{title}}</span>
        <span class="toolbar-spacer"></span>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #drawer mode="side" opened class="sidenav">
          <mat-nav-list>
            <a mat-list-item routerLink="/productos" routerLinkActive="active">
              <mat-icon matListItemIcon>inventory_2</mat-icon>
              <span>Lista de Productos</span>
            </a>
            <a mat-list-item routerLink="/productos/crear" routerLinkActive="active">
              <mat-icon matListItemIcon>add_circle</mat-icon>
              <span>Crear Producto</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="sidenav-content">
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
    }

    .toolbar-spacer {
      flex: 1 1 auto;
    }

    .sidenav-container {
      flex: 1;
      margin-top: 64px;
      height: calc(100vh - 64px);
    }

    .sidenav {
      width: 250px;
      background-color: #f5f5f5;
    }

    .sidenav-content {
      padding: 20px;
      background-color: #fafafa;
    }

    .active {
      background-color: rgba(0, 0, 0, 0.04);
    }

    mat-nav-list a {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    mat-nav-list mat-icon {
      margin-right: 8px;
    }
  `]
})
export class AppComponent {
  title = 'Gestión de Productos';
}