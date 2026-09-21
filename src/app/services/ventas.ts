import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environments';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private apiUrl = environment.apiUrl;

  // Lista temporal mientras se conecta el backend
  private productosMock: Producto[] = [
    { id: 1, nombre: 'Polvoron', precio: 5.50, imagen: '/productos/polvoron.jpg', cantidad: 0 },
    { id: 2, nombre: 'Bisquets', precio: 6.00, imagen: '/productos/bisquets.jpg', cantidad: 0 },
    { id: 3, nombre: 'Concha Tradicional', precio: 5.00, imagen: '/productos/concha.jpg', cantidad: 0 },
    { id: 4, nombre: 'Beso', precio: 4.00, imagen: '/productos/beso.jpg', cantidad: 0 },
    { id: 5, nombre: 'Pastelito', precio: 6.00, imagen: '/productos/pastelito.jpg', cantidad: 0 },
    { id: 6, nombre: 'Hojaldra', precio: 12.00, imagen: '/productos/hojaldras.jpg', cantidad: 0 },
    { id: 7, nombre: 'Rebanadas con Mantecada', precio: 7.00, imagen: '/productos/rebanadas con mantecada.jpg', cantidad: 0 },
    { id: 8, nombre: 'Barquillo', precio: 5.00, imagen: '/productos/barquillo.jpg', cantidad: 0 },
    { id: 9, nombre: 'Donas Rellenas', precio: 8.00, imagen: '/productos/donas rellenas.jpg', cantidad: 0 },
    { id: 10, nombre: 'Mantecada', precio: 7.00, imagen: '/productos/mantecadas.jpg', cantidad: 0 },
    { id: 11, nombre: 'Croissant', precio: 8.00, imagen: '/productos/croissant.jpg', cantidad: 0 },
    { id: 12, nombre: 'Oreja', precio: 6.00, imagen: '/productos/orejas.jpg', cantidad: 0 },
    { id: 13, nombre: 'Pan de Queso', precio: 9.00, imagen: '/productos/pan de queso.jpg', cantidad: 0 },
    { id: 14, nombre: 'Bolillo', precio: 4.00, imagen: '/productos/bolillos.jpg', cantidad: 0 },
    { id: 15, nombre: 'Cuernito', precio: 4.50, imagen: '/productos/cuernitos.jpg', cantidad: 0 }
  ];

  constructor(private http: HttpClient) {}

  // Obtener la lista de productos
  obtenerProductos(): Observable<Producto[]> {
    return of(this.productosMock); 
    // Cuando esté el backend listo, se usará: return this.http.get<Producto[]>(`${this.apiUrl}/productos`);
  }

  // Registrar un pedido hecho por el cliente
  guardarPedido(pedido: any): Observable<any> {
    return of({ exito: true, mensaje: 'Pedido guardado localmente' });
    // Cuando esté el backend listo, se usará: return this.http.post(`${this.apiUrl}/pedidos`, pedido);
  }
}