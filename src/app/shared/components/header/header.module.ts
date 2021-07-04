import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule {
}
