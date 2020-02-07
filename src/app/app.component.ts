import { Component } from '@angular/core';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** Formulario que se le pasará al tooltip */
  tooltipForm: FormGroup;

  /** Componente a utilizar por la directiva customTooltip */
  tooltipComponent = TooltipComponent;

  /** Encabezado del template */
  tooltipTitle = 'Datos de la persona';

  /** Objeto con datos de una persona */
  person = {
    name: 'Iván Gabriel',
    lastName: 'Pajón Rodríguez',
    hobbies: ['programar', 'leer', 'jugar videojuegos'],
  };

  /** Hora formateada que se irá actualizando cada segundo */
  time: string;

  constructor() {
    // Se inicializa el formulario para el tooltip
    this.tooltipForm = new FormGroup({
      title: new FormControl(),
      body: new FormControl(),
      footer: new FormControl()
    });

    // Se actualiza el string con la hora cada segundo
    setInterval(() => {
      const currentDate = new Date();
      const hrs = this.addZero(currentDate.getHours());
      const mins = this.addZero(currentDate.getMinutes());
      const secs = this.addZero(currentDate.getSeconds());
      this.time = `${hrs}:${mins}:${secs}`;
    }, 1000);
  }

  /**
   * Añade un cero a la izquierda si el número es menor a 10
   * @param num Número a comprobar
   * @returns Número formateado
   */
  addZero(num: number): string {
    if (num < 10) {
      return `0${num}`;
    }
    return `${num}`;
  }
}
