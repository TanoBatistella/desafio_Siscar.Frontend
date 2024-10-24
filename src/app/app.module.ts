import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // Añadidos los imports específicos

import { AppComponent } from './app.component';
import { ListaProductosComponent } from './components/productos/lista-productos/lista-productos.component';
import { CrearProductoComponent } from './components/productos/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './components/productos/editar-producto/editar-producto.component';

const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: 'productos', component: ListaProductosComponent },
  { path: 'productos/crear', component: CrearProductoComponent },
  { path: 'productos/editar/:id', component: EditarProductoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    CrearProductoComponent,
    EditarProductoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,  // Añadido
    RouterLink,    // Añadido
    RouterLinkActive  // Añadido
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }