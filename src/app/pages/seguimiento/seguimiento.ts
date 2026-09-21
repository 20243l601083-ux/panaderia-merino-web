import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-seguimiento',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seguimiento.html',
  styleUrl: './seguimiento.scss'
})
export class Seguimiento implements OnInit {
  estadoActual: string = 'Esperando ubicación';
  progreso: number = 0;
  ultimaActualizacion: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Lista de estados basada en el diseño
  estados = [
    {
      titulo: 'Pedido realizado con éxito',
      subtitulo: 'Ahora',
      completado: true,
      icono: '✓'
    },
    {
      titulo: 'El repartidor salió de la panadería',
      subtitulo: 'En ruta',
      completado: true,
      icono: '✓'
    },
    {
      titulo: 'Tu repartidor se aproxima a tu domicilio',
      subtitulo: '0% completado',
      completado: false,
      icono: '📦'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  simularRecorrido() {
    this.estadoActual = 'En camino a tu domicilio...';
    let count = 0;
    const interval = setInterval(() => {
      if (count < 100) {
        count += 20;
        this.progreso = count;
        this.estados[2].subtitulo = `${count}% completado`;
      } else {
        this.estados[2].completado = true;
        this.estadoActual = '¡Pedido Entregado!';
        clearInterval(interval);
      }
    }, 1000);
  }

  usarUbicacion() {
    this.estadoActual = 'Ubicación actualizada';
    this.ultimaActualizacion = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  navegar(ruta: string) {
    this.router.navigate([`/${ruta}`]);
  }
}
