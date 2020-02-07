import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';

/** Token de inyección personalizado (se espera una instancia de FormGroup) */
export const CUSTOM_TOOLTIP_DATA = new InjectionToken<FormGroup>('CUSTOM_TOOLTIP_DATA');

@Component({
  selector: 'tooltip-component',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  constructor(
    // Nuestro token personalizado es una dependencia del componente
    @Inject(CUSTOM_TOOLTIP_DATA) public componentData: FormGroup
  ) { }

  ngOnInit() { }

}
