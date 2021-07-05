import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICart, ICartItem } from '../ngrx/shopping-cart/shopping-cart.interface';
import { selectCarts } from '../ngrx/shopping-cart/shopping-cart.selectors';
import { clearCart, deleteProduct, setProductQuantity } from '../ngrx/shopping-cart/shopping-cart.actions';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('stepper') stepper!: MatStepper;
  public products: ICartItem[] = [];
  public MIN_QUANTITY = 1;
  public MIN_LENGTH = 2;
  public form!: FormGroup;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private store: Store<ICart>,
    private router: Router,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.store.select(selectCarts).subscribe((resp) => {
      // @ts-ignore
      this.products = resp.cart;
      if (!this.products.length) {
        this.router.navigate(['/store']);
      }
      this.createForm();
    });
  }


  ngAfterViewInit(): void {
    this.stepper.selectionChange
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(resp => {
        if (resp.selectedIndex === 2) {
          this.fillBillingForm();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm() {
    this.form = this.fb.group({
      cart: this.fb.array([]),
      shippingAddress: this.createShippingAddressForm(),
      billingAddress: this.createShippingAddressForm(false),
      payment: this.fb.group({
        owner: new FormControl('', [Validators.required]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.minLength(16),
          Validators.min(1111111111111111),
          Validators.max(9999999999999999),
          Validators.pattern('^[0-9]*$')
        ]),
        expired: new FormControl('', [Validators.required, Validators.pattern('\\d{2}\\/\\d{2}')]),
        code: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      }),
    });

    if (this.products.length) {
      this.products.forEach(p => {
        this.addProductToForm(p);
      });
    }
  }

  private addProductToForm(p: ICartItem) {
    const group = this.fb.group({
      id: new FormControl(p.id || '', [Validators.required]),
      name: new FormControl(p.name || '', [Validators.required]),
      quantity: new FormControl(
        p.quantity || '',
        [Validators.required, Validators.min(this.MIN_QUANTITY), Validators.nullValidator]
      ),
    });
    this.cartFormArray.push(group);
  }

  get cartFormArray(): FormArray {
    return this.form.get('cart') as FormArray;
  }

  get shippingAddressFormGroup(): FormGroup {
    return this.form.get('shippingAddress') as FormGroup;
  }

  get billingAddressFormGroup(): FormGroup {
    return this.form.get('billingAddress') as FormGroup;
  }

  get paymentFormGroup(): FormGroup {
    return this.form.get('payment') as FormGroup;
  }

  productFormFromCartArray(i: number): FormGroup {
    return this.cartFormArray.controls[i] as FormGroup;
  }

  removeItem(p: ICartItem) {
    this.store.dispatch(deleteProduct({ product: p }));
  }

  setQuantity($event: Event, p: ICartItem) {
    // @ts-ignore
    this.store.dispatch(setProductQuantity({ quantity: +$event.target.value, product: p }));
  }

  private createShippingAddressForm(isUseSameAddress: boolean = true): FormGroup {
    const group = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(this.MIN_LENGTH)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(this.MIN_LENGTH)]),
      address1: new FormControl('', [Validators.required, Validators.minLength(this.MIN_LENGTH)]),
      address2: new FormControl('', []),
      city: new FormControl('', [Validators.required, Validators.minLength(this.MIN_LENGTH)]),
      country: new FormControl('', [Validators.required, Validators.minLength(this.MIN_LENGTH)]),
      postalCode: new FormControl('', [Validators.required, Validators.minLength(this.MIN_LENGTH)]),
    });
    if (isUseSameAddress) {
      group.addControl('useSameForBilling', new FormControl(true));
    }
    return group;
  }

  test() {
    console.log(this.form.value);
  }

  private fillBillingForm() {
    const shippingForm = this.shippingAddressFormGroup.value;
    if (shippingForm?.useSameForBilling) {
      this.billingAddressFormGroup.get('firstName')?.patchValue(shippingForm.firstName);
      this.billingAddressFormGroup.get('lastName')?.patchValue(shippingForm.lastName);
      this.billingAddressFormGroup.get('address1')?.patchValue(shippingForm.address1);
      this.billingAddressFormGroup.get('address2')?.patchValue(shippingForm.address2);
      this.billingAddressFormGroup.get('city')?.patchValue(shippingForm.city);
      this.billingAddressFormGroup.get('country')?.patchValue(shippingForm.country);
      this.billingAddressFormGroup.get('postalCode')?.patchValue(shippingForm.postalCode);
    }
  }

  resetCart() {
    this.store.dispatch(clearCart());
  }

}
