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

    // Mensaje de éxito simulado
    alert('¡Pago procesado con éxito! Redirigiendo al seguimiento de tu pedido...');

    // Limpiamos el carrito guardado para simular que la compra ya se completó
    localStorage.removeItem('carrito');

    // Redirigimos directamente a la pantalla de seguimiento
    this.navegar('seguimiento');
  }

  navegar(ruta: string) {
    this.router.navigate([`/${ruta}`]);
  }
}
