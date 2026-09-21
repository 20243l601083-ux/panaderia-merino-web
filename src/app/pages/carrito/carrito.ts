import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface ItemCarrito {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.scss'
})
export class Carrito implements OnInit {
  // Lista de items guardados en el carrito
  items: ItemCarrito[] = [
    { id: 1, nombre: 'Polvoron', precio: 5.50, imagen: 'assets/polvoron.jpg', cantidad: 2 },
    { id: 3, nombre: 'Concha Tradicional', precio: 5.00, imagen: 'assets/concha.jpg', cantidad: 1 }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Si guardas el carrito en localStorage, aquí podrías cargarlo:
    const cartSaved = localStorage.getItem('carrito');
    if (cartSaved) {
      this.items = JSON.parse(cartSaved);
    }
  }

  // Suma de todos los productos
  get subtotal(): number {
    return this.items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  }

  // Costo de envío (fijo o dinámico)
  get envio(): number {
    return this.items.length > 0 ? 15.00 : 0;
  }

  // Total final
  get total(): number {
    return this.subtotal + this.envio;
  }

  incrementar(item: ItemCarrito) {
    item.cantidad++;
    this.guardarCarrito();
  }

  decrementar(item: ItemCarrito) {
    if (item.cantidad > 1) {
      item.cantidad--;
    } else {
      this.eliminarItem(item.id);
    }
    this.guardarCarrito();
  }

  eliminarItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
    this.guardarCarrito();
  }

  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.items));
  }

  navegar(ruta: string) {
    this.router.navigate([`/${ruta}`]);
  }
}
