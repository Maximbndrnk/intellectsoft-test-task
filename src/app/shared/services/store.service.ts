import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  constructor(
    private http: HttpClient,
  ) { }

  getProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>('assets/mock-data/products.mock.json');
  }
}
