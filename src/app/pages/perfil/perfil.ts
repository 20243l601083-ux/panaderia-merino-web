import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss'
})
export class Perfil implements OnInit {
  usuario = {
    nombre: 'Lizzette',
    apellidos: 'Rodriguez',
    correo: 'lizzetterodriguezmunoz@gmail.com',
    telefono: '',
    municipio: '',
    colonia: '',
    direccion: ''
  };

  datosPago = {
    alias: 'Mi tarjeta',
    numeroTarjeta: '****************',
    cvc: '***',
    fechaVencimiento: '**/**'
  };

  mostrarTarjeta: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const savedUser = localStorage.getItem('usuario_panaderia');
    if (savedUser) {
      this.usuario = JSON.parse(savedUser);
    }
  }

  get iniciales(): string {
    const n = this.usuario.nombre ? this.usuario.nombre.charAt(0) : '';
    const a = this.usuario.apellidos ? this.usuario.apellidos.charAt(0) : '';
    return `${n}${a}`.toUpperCase() || 'PM';
  }

  get nombreCompleto(): string {
    return `${this.usuario.nombre} ${this.usuario.apellidos}`.trim() || 'Usuario Merino';
  }

  guardarPerfil() {
    localStorage.setItem('usuario_panaderia', JSON.stringify(this.usuario));
    alert('¡Datos guardados correctamente!');
    this.navegar('productos'); // <-- Redirige a productos al guardar
  }

  toggleMostrarTarjeta() {
    this.mostrarTarjeta = !this.mostrarTarjeta;
  }

  cerrarSesion() {
    localStorage.removeItem('usuario_panaderia');
    this.navegar('login');
  }

  navegar(ruta: string) {
    this.router.navigate([`/${ruta}`]);
  }
}
