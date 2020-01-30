import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { CustomTooltipDirective } from './directives/custom-tooltip.directive';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    TooltipComponent,
    CustomTooltipDirective
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatChipsModule,
    OverlayModule,
    MatDividerModule,
  ],
  entryComponents: [TooltipComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
