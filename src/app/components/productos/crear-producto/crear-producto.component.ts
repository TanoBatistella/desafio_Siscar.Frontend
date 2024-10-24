import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-crear-producto',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatRippleModule,
        MatIconModule,
        MatTooltipModule
    ],
    templateUrl: './crear-producto.component.html',
    styleUrls: ['./crear-producto.component.css'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(20px)' }),
                animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ]),
        trigger('formFieldAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateX(-20px)' }),
                animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
            ])
        ]),
        trigger('buttonState', [
            state('valid', style({
                backgroundColor: '#4CAF50',
                transform: 'scale(1)'
            })),
            state('invalid', style({
                backgroundColor: '#ccc',
                transform: 'scale(0.95)'
            })),
            transition('* => *', animate('200ms ease-in-out'))
        ])
    ]
})
export class CrearProductoComponent {
    productoForm: FormGroup;
    isLoading = false;
    formSubmitted = false;

    constructor(
        private fb: FormBuilder,
        private productoService: ProductoService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.productoForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            price: ['', [Validators.required, Validators.min(0)]],
            stock: ['', [Validators.required, Validators.min(0)]],
            description: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    getErrorMessage(controlName: string): string {
        const control = this.productoForm.get(controlName);
        if (control?.hasError('required')) {
            return 'Este campo es requerido';
        }
        if (control?.hasError('minlength')) {
            return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
        }
        if (control?.hasError('min')) {
            return 'El valor debe ser mayor o igual a 0';
        }
        return '';
    }

    onSubmit(): void {
        this.formSubmitted = true;
        if (this.productoForm.valid && !this.isLoading) {
            this.isLoading = true;
            this.productoService.crearProducto(this.productoForm.value).subscribe({
                next: () => {
                    this.isLoading = false;
                    this.showSuccessMessage();
                    this.router.navigate(['/productos']);
                },
                error: (error) => {
                    this.isLoading = false;
                    this.showErrorMessage(error);
                }
            });
        } else {
            this.highlightInvalidFields();
        }
    }

    private showSuccessMessage(): void {
        this.snackBar.open('Producto creado exitosamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    private showErrorMessage(error: any): void {
        this.snackBar.open(
            'Error al crear el producto: ' + (error.message || 'Error desconocido'),
            'Cerrar',
            {
                duration: 5000,
                panelClass: ['error-snackbar'],
                horizontalPosition: 'end',
                verticalPosition: 'top'
            }
        );
    }

    private highlightInvalidFields(): void {
        Object.keys(this.productoForm.controls).forEach(key => {
            const control = this.productoForm.get(key);
            if (control?.invalid) {
                control.markAsTouched();
            }
        });
    }

    volver(): void {
        this.router.navigate(['/productos']);
    }

    getFormFieldAnimation(index: number): any {
        return { value: '', params: { delay: index * 100 } };
    }
}