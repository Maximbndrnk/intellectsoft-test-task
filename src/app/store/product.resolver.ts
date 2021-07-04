import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IProduct } from '../shared/interfaces/product.interface';
import { Observable } from 'rxjs';
import { StoreService } from '../shared/services/store.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IProduct[]> {

  constructor(
    private storeService: StoreService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct[]> {
    return this.storeService.getProducts();
  }
}
