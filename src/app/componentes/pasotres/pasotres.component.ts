import { Component } from '@angular/core';
import { ConsultaCentralesService } from 'src/app/servicios/consultaCentrales.service';
import { RespuestaCalculadoraService } from 'src/app/servicios/respuestaCalculadora.service';
import { Constantes } from 'src/constantes/constantes';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ScanparamsService } from 'src/app/servicios/scanparams.service';

@Component({
  selector: 'app-pasotres',
  templateUrl: './pasotres.component.html',
  styleUrls: ['./pasotres.component.scss'],
  animations: [
    trigger('animationFadeOut', [
      transition(':enter', [
        style({ opacity: '1' }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({ opacity: '0' }))
      ]),
      state('*', style({ opacity: '1' })),
    ])
  ]
})
export class PasotresComponent {
  resultado: number;
  variantePreaprobado: number;
  letraMensaje: string;
  const = Constantes;

  constructor(public consultaCentrales: ConsultaCentralesService,
              public respuestaCalculadora: RespuestaCalculadoraService,
              ) {
    this.viabilizar();
   }

   viabilizar() {
    this.consultaCentrales.observableAutenticar.subscribe((value: number) => {
      if (value === 1) {
      if (this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadEconomica) {
        if (this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadEconomica === 1) {
            this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadEconomica = 1;
            this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadIndependiente = 15;
        }
        if (this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadEconomica === 11) {
            this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadEconomica = 1;
            this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadIndependiente = 16;
        }
        if (this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadEconomica === 2) {
            this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadEconomica = 2;
            this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadIndependiente = 3;
        }
    }
      this.consultaCentrales.respuesta(this.consultaCentrales.contactoCentrales).subscribe((res: any) => {
        this.resultado = res.IdResultado;
        this.letraMensaje = res.ResultadoLetra;
      });
    }
  });
  }
  gotoReferrer() {
  window.location.href = this.consultaCentrales.linkOrigen;
}

}



