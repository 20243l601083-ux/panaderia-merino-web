import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-exito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './exito.html',
  styleUrl: './exito.scss'
})
export class Exito implements OnInit {
  total: string = '81.50';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Captura el total enviado por los parámetros de la URL si existe
    this.route.queryParams.subscribe(params => {
      if (params['total']) {
        this.total = params['total'];
      }
    });
  }

  navegar(ruta: string): void {
    this.router.navigate([`/${ruta}`]);
  }
}
