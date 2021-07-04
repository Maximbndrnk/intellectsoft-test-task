import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { LoaderModule } from '../shared/components/loader/loader.module';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolver } from './product.resolver';
import { StoreService } from '../shared/services/store.service';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
    resolve: {
      products: ProductResolver,
    }
  },
];

@NgModule({
  declarations: [
    StoreComponent
  ],
  imports: [
    CommonModule,
    LoaderModule,
    RouterModule.forChild(routes),
  ],
  providers: []
})
export class StoreModule {
}
