import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICart, ICartItem } from '../ngrx/shopping-cart/shopping-cart.interface';
import { selectCarts } from '../ngrx/shopping-cart/shopping-cart.selectors';
import { deleteProduct, setProductQuantity } from '../ngrx/shopping-cart/shopping-cart.actions';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public products: ICartItem[] = [];
  MIN_QUANTITY = 1;
  form!: FormGroup;
  secondFormGroup!: FormGroup;


  constructor(
    private store: Store<ICart>,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.store.select(selectCarts).subscribe((resp) => {
      // @ts-ignore
      this.products = resp.cart;
      this.createForm();
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
    console.log('this', this.form);
  }

  private createForm() {
    this.form = this.fb.group({
      cart: this.fb.array([]),
    });

    if (this.products.length) {
      this.products.forEach(p => {
        this.addProductToForm(p);
      });
    }
  }


  removeItem(p: ICartItem) {
    this.store.dispatch(deleteProduct({ product: p }));
  }

  setQuantity($event: Event, p: ICartItem) {
    // @ts-ignore
    this.store.dispatch(setProductQuantity({ quantity: +$event.target.value, product: p }));
  }

  private addProductToForm(p: ICartItem) {
    const group = this.fb.group({
      id: new FormControl(p.id || '', [Validators.required]),
      name: new FormControl(p.name || '', [Validators.required]),
      quantity: new FormControl(
        p.quantity || '',
        [Validators.required, Validators.min(this.MIN_QUANTITY)]
      ),
    });
    this.cartFormArray.push(group);
  }

  get cartFormArray(): FormArray {
    return this.form.get('cart') as FormArray;
  }

  productFormFromCartArray(i: number): FormGroup {
    return this.cartFormArray.controls[i] as FormGroup;
  }

}
