import { Directive, Input, TemplateRef, OnInit, ElementRef, HostListener, ViewContainerRef, Injector } from '@angular/core';
import { ComponentType, ComponentPortal, TemplatePortal, PortalInjector } from '@angular/cdk/portal';
import { OverlayRef, Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { CUSTOM_TOOLTIP_DATA } from '../components/tooltip/tooltip.component';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[customTooltip]'
})
export class CustomTooltipDirective implements OnInit {
  /** Contenido que se va a renderizar dentro del tooltip */
  @Input('customTooltip') tooltipContent: TemplateRef<any> | ComponentType<any>;

  /** Objeto que se le quiere pasar como datos al tooltip */
  @Input('customTooltipData') data: FormGroup = new FormGroup({});

  /** Overlay que simula ser un tooltip */
  private _overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
  ) { }

  ngOnInit(): void {
    // Si se recibe el contenido a mostrar
    if (this.tooltipContent) {
      // Se crea la configuración de posicionamiento para el tooltip
      const position = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetX: 0,
          offsetY: 8,
        },
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetX: 0,
          offsetY: -8,
        }
      ]);

      // Se crea el overlay y se guarda su referencia
      this._overlayRef = this.overlay.create({
        // Configuración para la posición del overlay
        positionStrategy: position,
        // Comportamiento del overlay cuando se haga scroll y se esté mostrando
        scrollStrategy: this.overlay.scrollStrategies.close(),
        // Clase para darle estilo al overlay
        panelClass: 'custom-tooltip',
      });
    }
    // Se muestra un error si la directiva no recibe contenido para mostrar
    else {
      console.error('[ERROR] La directiva tiene que recibir el contenido a mostrar...');
    }
  }

  @HostListener('mouseenter')
  private _show(): void {
    // Si existe overlay se enlaza con el contenido
    if (this._overlayRef) {
      let containerPortal: TemplatePortal<any> | ComponentPortal<any>;

      // Creamos un TemplatePortal si es lo que recibió la directiva
      if (this.tooltipContent instanceof TemplateRef) {
        containerPortal = new TemplatePortal(this.tooltipContent, this.viewContainerRef);
      }
      // En caso contrario creamos un ComponentPortal
      else {
        containerPortal = new ComponentPortal(
          this.tooltipContent,
          this.viewContainerRef,
          this._createInjector(this.data)  // Creamos y pasamos el inyector con los datos
        );
      }

      // Enlazamos el portal con el overlay creado
      this._overlayRef.attach(containerPortal);
    }
  }

  @HostListener('mouseout')
  private _hide(): void {
    // Si existe un overlay se desenlaza del contenido
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
  }

  /**
   * Crea un inyector de tokens con los datos que se le van a pasar al tooltip
   * @param data Formulario que se le pasará al tooltip
   * @returns Inyector del token
   */
  private _createInjector(data: FormGroup): PortalInjector {
    const injectorTokens = new WeakMap();

    injectorTokens.set(CUSTOM_TOOLTIP_DATA, data);

    return new PortalInjector(this.injector, injectorTokens);
  }

}
