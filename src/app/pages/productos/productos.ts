import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { VentasService, Producto } from '../../services/ventas'; // Apunta exactamente a tu archivo ventas.ts

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './productos.html',
  styleUrl: './productos.scss'
})
export class Productos implements OnInit {
  usuarioEmail: string = '';
  productos: Producto[] = [];

  constructor(
    private router: Router,
    private ventasService: VentasService
  ) {}

  ngOnInit() {
    const session = localStorage.getItem('userEmail');
    if (session) {
      this.usuarioEmail = session;
    }

    this.ventasService.obtenerProductos().subscribe((data: Producto[]) => {
      this.productos = data;
      this.sincronizarConCarrito();
    });
  }

  sincronizarConCarrito() {
    const cartSaved = localStorage.getItem('carrito');
    if (cartSaved) {
      const itemsGuardados: Producto[] = JSON.parse(cartSaved);
      this.productos.forEach(prod => {
        const encontrado = itemsGuardados.find(item => item.id === prod.id);
        if (encontrado) {
          prod.cantidad = encontrado.cantidad;
        }
      });
    }
  }

  incrementar(producto: Producto) {
    producto.cantidad++;
    this.actualizarCarritoStorage();
  }

  decrementar(producto: Producto) {
    if (producto.cantidad > 0) {
      producto.cantidad--;
      this.actualizarCarritoStorage();
    }
  }

  actualizarCarritoStorage() {
    const seleccionados = this.productos.filter(p => p.cantidad > 0);
    localStorage.setItem('carrito', JSON.stringify(seleccionados));
  }

  navegar(ruta: string) {
    this.router.navigate([`/${ruta}`]);
  }
}