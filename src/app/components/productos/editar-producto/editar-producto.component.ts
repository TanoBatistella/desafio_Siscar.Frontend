import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-editar-producto',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule
    ],
    templateUrl: './editar-producto.component.html',
    styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
    productoForm: FormGroup;
    id: number = 0;

    constructor(
        private fb: FormBuilder,
        private productoService: ProductoService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.productoForm = this.fb.group({
            name: ['', Validators.required],
            price: ['', [Validators.required, Validators.min(0)]],
            stock: ['', [Validators.required, Validators.min(0)]],
            description: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.cargarProducto();
        });
    }

    cargarProducto(): void {
        this.productoService.getProducto(this.id).subscribe({
            next: (producto) => {
                this.productoForm.patchValue({
                    name: producto.name,
                    price: producto.price,
                    stock: producto.stock,
                    description: producto.description
                });
            },
            error: (error) => console.error('Error al cargar:', error)
        });
    }

    onSubmit(): void {
        if (this.productoForm.valid) {
            this.productoService.actualizarProducto(this.id, this.productoForm.value).subscribe({
                next: () => {
                    this.router.navigate(['/productos']);
                },
                error: (error) => console.error('Error al actualizar:', error)
            });
        }
    }

    volver(): void {
        this.router.navigate(['/productos']);
    }
}