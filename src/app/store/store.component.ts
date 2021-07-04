import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../shared/interfaces/product.interface';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  public isLoading = false;
  public products: IProduct[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.products = this.route.snapshot.data.products;
    console.log('fff', this);
  }

  addItemToCart(i: number) {
    
  }
}
