import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-seguimiento',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seguimiento.html',
  styleUrl: './seguimiento.scss'
})
export class Seguimiento implements OnInit, OnDestroy {
  estadoActual: string = 'Esperando ubicación';
  progreso: number = 0;
  ultimaActualizacion: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Lista de estados basada en tu diseño
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

  // Variables para la integración de Leaflet
  private map!: L.Map;
  private repartidorMarker!: L.Marker;
  private intervalId: any;

  // Coordenadas de prueba (Panadería y Cliente)
  private ubicacionPanaderia: L.LatLngTuple = [18.4525, -96.3533];
  private ubicacionCliente: L.LatLngTuple = [18.4580, -96.3480];

  // Ruta ficticia por la que avanza el repartidor
  private rutaRepartidor: L.LatLngTuple[] = [
    [18.4525, -96.3533],
    [18.4540, -96.3520],
    [18.4555, -96.3505],
    [18.4570, -96.3490],
    [18.4580, -96.3480]
  ];

  private pasoActual = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Retardo breve para asegurar que el HTML (#map) esté renderizado en el DOM
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  private initMap(): void {
    // 1. Crear el mapa centrado en la panadería
    this.map = L.map('map').setView(this.ubicacionPanaderia, 15);

    // 2. Cargar capas gratuitas de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    // 3. Marcador Panadería
    L.marker(this.ubicacionPanaderia)
      .addTo(this.map)
      .bindPopup('<b>Panadería Merino</b><br>Origen del pedido')
      .openPopup();

    // 4. Marcador Cliente
    L.marker(this.ubicacionCliente)
      .addTo(this.map)
      .bindPopup('<b>Tu Domicilio</b><br>Punto de entrega');

    // 5. Marcador Móvil del Repartidor
    this.repartidorMarker = L.marker(this.ubicacionPanaderia).addTo(this.map);
  }

  simularRecorrido(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.estadoActual = 'En camino a tu domicilio...';
    this.pasoActual = 0;
    let count = 0;

    this.intervalId = setInterval(() => {
      if (count < 100) {
        count += 20;
        this.progreso = count;
        this.estados[2].subtitulo = `${count}% completado`;

        // Actualizar la posición del marcador en el mapa de Leaflet
        if (this.pasoActual < this.rutaRepartidor.length) {
          const nuevaUbicacion = this.rutaRepartidor[this.pasoActual];
          this.repartidorMarker.setLatLng(nuevaUbicacion);
          this.map.panTo(nuevaUbicacion);
          this.pasoActual++;
        }
      } else {
        this.estados[2].completado = true;
        this.estadoActual = '¡Pedido Entregado!';
        this.ultimaActualizacion = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  usarUbicacion(): void {
    this.estadoActual = 'Ubicación actualizada';
    this.ultimaActualizacion = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        this.map.setView([userLat, userLng], 16);
        L.marker([userLat, userLng])
          .addTo(this.map)
          .bindPopup('<b>Tu ubicación actual</b>')
          .openPopup();
      });
    }
  }

  navegar(ruta: string): void {
    this.router.navigate([`/${ruta}`]);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
