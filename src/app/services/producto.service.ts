import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Producto } from '../models/producto.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    private apiUrl = 'http://localhost:3000/api/productos';

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar
    ) { }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Ha ocurrido un error';

        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Error del servidor
            errorMessage = `Código: ${error.status}\nMensaje: ${error.error?.message || error.message}`;
            
            // Manejo específico de errores comunes
            switch (error.status) {
                case 0:
                    errorMessage = 'No se puede conectar al servidor';
                    break;
                case 404:
                    errorMessage = 'Recurso no encontrado';
                    break;
                case 500:
                    errorMessage = 'Error interno del servidor';
                    break;
            }
        }

        this.snackBar.open(errorMessage, 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
        });

        return throwError(() => new Error(errorMessage));
    }

    private showSuccess(message: string) {
        this.snackBar.open(message, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
        });
    }

    getProductos(): Observable<Producto[]> {
        return this.http.get<Producto[]>(this.apiUrl).pipe(
            tap(() => console.log('Productos obtenidos correctamente')),
            catchError(this.handleError.bind(this))
        );
    }

    getProducto(id: number): Observable<Producto> {
        return this.http.get<Producto>(`${this.apiUrl}/${id}`).pipe(
            tap(producto => console.log('Producto obtenido:', producto)),
            catchError(this.handleError.bind(this))
        );
    }

    crearProducto(producto: Producto): Observable<Producto> {
        const productoData = {
            name: producto.name,
            description: producto.description,
            price: Number(producto.price),
            stock: Number(producto.stock)
        };
        return this.http.post<Producto>(this.apiUrl, productoData).pipe(
            tap(response => {
                console.log('Producto creado:', response);
                this.showSuccess('Producto creado exitosamente');
            }),
            catchError(this.handleError.bind(this))
        );
    }

    actualizarProducto(id: number, producto: Producto): Observable<Producto> {
        const productoData = {
            name: producto.name,  
            description: producto.description, 
            price: Number(producto.price),
            stock: Number(producto.stock)
        };
        return this.http.put<Producto>(`${this.apiUrl}/${id}`, productoData).pipe(
            tap(response => {
                console.log('Producto actualizado:', response);
                this.showSuccess('Producto actualizado exitosamente');
            }),
            catchError(this.handleError.bind(this))
        );
    }


    eliminarProducto(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`).pipe(
            tap(() => {
                console.log('Producto eliminado:', id);
                this.showSuccess('Producto eliminado exitosamente');
            }),
            catchError(this.handleError.bind(this))
        );
    }
}
