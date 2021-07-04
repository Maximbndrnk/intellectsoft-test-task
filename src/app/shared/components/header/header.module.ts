import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
    RouterModule,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule {
}
