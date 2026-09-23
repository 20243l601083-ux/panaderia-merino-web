import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-metodo-pago',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './metodo-pago.html',
  styleUrl: './metodo-pago.scss'
})
export class MetodoPago implements OnInit {
  metodoSeleccionado: string = 'mercado_pago'; // Dejar seleccionado por defecto opcionalmente
  direccionEntrega: string = '';
  totalCompra: number = 81.50; // Ejemplo de monto de compra o recabado del carrito

  constructor(private router: Router) {}

  ngOnInit() {}

  seleccionarMetodo(metodo: string) {
    this.metodoSeleccionado = metodo;
  }

  procesarPago() {
    if (!this.metodoSeleccionado) {
      alert('Por favor, selecciona un método de pago.');
      return;
    }

    if (!this.direccionEntrega.trim()) {
      alert('Por favor, ingresa tu dirección de entrega.');
      return;
    }

    // Limpiamos el carrito guardado
    localStorage.removeItem('carrito');

    if (this.metodoSeleccionado === 'mercado_pago') {
      // 1. Si tu compañero tuviera el backend listo, aquí llamarías a su API para obtener el init_point/link de Mercado Pago.
      // 2. Para simular el flujo completo en la interfaz hoy mismo:
      this.simularRedireccionMercadoPago();
    } else {
      // Si eligen pago en efectivo u otro método, va directo al seguimiento
      this.navegar('seguimiento');
    }
  }

  private simularRedireccionMercadoPago() {
    // Redirige a la pantalla de Éxito / Confirmación que tienes diseñada en tus fotos
    this.router.navigate(['/exito'], { 
      queryParams: { 
        total: this.totalCompra, 
        pedido: Math.floor(Math.random() * 100) + 10 
      } 
    });
  }

  navegar(ruta: string) {
    this.router.navigate([`/${ruta}`]);
  }
}
