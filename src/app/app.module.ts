import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { CustomTooltipDirective } from './directives/custom-tooltip.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    TooltipComponent,
    CustomTooltipDirective
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    NoopAnimationsModule,
    MatChipsModule,
    OverlayModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  entryComponents: [TooltipComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
