import { Component } from '@angular/core';
import { Constantes } from '../constantes/constantes';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ConsultaCentralesService } from './servicios/consultaCentrales.service';
import { ScanparamsService } from './servicios/scanparams.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
export class AppComponent {
  const = Constantes;
  splash = true;

  constructor(public consultaCentrales: ConsultaCentralesService,
              public scanParams: ScanparamsService,
              private titleService: Title) {
    this.scanParams.getParam();
    this.splashToggle();
    this.titleService.setTitle(this.const.nombreCliente);
  }

  splashToggle() {
    setTimeout(() => {
      this.splash = false;
      this.consultaCentrales.linkOrigen = document.referrer;
    }, 2000);
  }
}
