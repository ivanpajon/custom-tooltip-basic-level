import { Component } from '@angular/core';
import { TooltipComponent } from './components/tooltip/tooltip.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tooltipComponent = TooltipComponent;
}
