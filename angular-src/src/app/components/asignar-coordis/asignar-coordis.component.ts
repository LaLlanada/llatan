import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

// Http Requests
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-asignar-coordis',
  templateUrl: './asignar-coordis.component.html',
  styleUrls: ['./asignar-coordis.component.css']
})
export class AsignarCoordisComponent implements OnInit {

  coordis: any;
  area: any;
  evento: any;
  tipos: any;

  constructor(
    private http: Http,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {

    this.tipos = JSON.parse(localStorage.getItem('tipos'));
    this.coordis = JSON.parse(localStorage.getItem('coordis'));

  }

  asignar(i, coordina) {
    this.coordis[i].Coordina = coordina;
    this.coordis[i].Area = this.tipos[coordina].Area;
    localStorage.setItem('coordis',JSON.stringify(this.coordis));
  }

  quitar(i) {
    this.coordis[i].Coordina = 0;
    localStorage.setItem('coordis',JSON.stringify(this.coordis));
  }

  regresar() {
    this.router.navigate(['detalle-evento']);
  }

  guardar() {
    localStorage.setItem('coordis',JSON.stringify(this.coordis));
    let headers = new Headers();

    // Settear los encabezados para la petición al API
    headers.append('Authorization', localStorage.getItem('id_token'));
    headers.append('Content-Type', 'application/json');

    for (let i = 0; i < this.coordis.length; i++) {

        let data = {
          Evento: JSON.parse(localStorage.getItem('detalle-evento')).id,
          Guia: this.coordis[i].id,
          Tipo: this.coordis[i].Coordina
        }
        // Hacer la petición, se retorna una promesa
        this.http.post('http://localhost:3000/users/guardar-coordis', data, { headers })
        .map(res => res.json())
        .subscribe(response => {
          if (response.success) {
            this.flashMessage.show(response.msg, { cssClass: 'custom-success', timeout: 3000 });
          } else {
            this.flashMessage.show(response.msg, { cssClass: 'custom-danger', timeout: 3000 });
          }
          document.location.reload();
        });
      
    }
  }

}
