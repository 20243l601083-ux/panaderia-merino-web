import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Productos } from './pages/productos/productos';
import { Carrito } from './pages/carrito/carrito';
import { MetodoPago } from './pages/metodo-pago/metodo-pago';
import { Seguimiento } from './pages/seguimiento/seguimiento';
import { Perfil } from './pages/perfil/perfil'; 
import { Exito } from './pages/exito/exito'; // Linea agregada

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'productos', component: Productos },
  { path: 'carrito', component: Carrito },
  { path: 'pago', component: MetodoPago },
  { path: 'seguimiento', component: Seguimiento },
  { path: 'perfil', component: Perfil },
  { path: 'exito', component: Exito }, // Ruta agregada
  { path: '**', redirectTo: 'productos' }
];