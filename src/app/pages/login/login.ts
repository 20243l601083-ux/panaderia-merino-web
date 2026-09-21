import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Login {
  isToggle = false;

  // Variables para capturar los datos de los formularios
  nombre: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  toggleForm() {
    this.isToggle = !this.isToggle;
  }

  // Función al dar clic en Iniciar Sesión
  onLogin() {
    if (this.email.trim() && this.password.trim()) {
      localStorage.setItem('userEmail', this.email);
      this.router.navigate(['/productos']);
    } else {
      alert('Por favor, ingresa tu correo y contraseña.');
    }
  }

  // Función al dar clic en Registrarse
  onRegister() {
    if (this.nombre.trim() && this.email.trim() && this.password.trim()) {
      localStorage.setItem('userEmail', this.email);
      localStorage.setItem('userName', this.nombre);
      this.router.navigate(['/productos']);
    } else {
      alert('Por favor, completa todos los campos para registrarte.');
    }
  }
}
