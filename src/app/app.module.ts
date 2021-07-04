import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { HeaderModule } from './shared/components/header/header.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { cartReducer } from './ngrx/shopping-cart/shopping-cart.reduser';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    StoreModule.forRoot({
      cart: cartReducer
    }, {}),
    HeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
