import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Inject, Pipe } from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-items-grupo-detalleal',
  templateUrl: './items-grupo-detalleal.component.html',
  styleUrls: ['./items-grupo-detalleal.component.css']
})
export class ItemsGrupoDetallealComponent implements OnInit {

  public resultado: object;
  private _success = new Subject<string>();
  successMessage: string;
  staticAlertClosed = false;

  ngOnInit() {
    /*this._success.subscribe((message) => this.successMessage = message);*/

    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(6000)
    ).subscribe(() => this.successMessage = null);
    //alert para eliminar y editar

  }

  constructor(private http: HttpClient,private _Activatedroute: ActivatedRoute,@Inject('BASE_URL') baseUrl: string) {
    this.http.get<any[]>('https://telefonica-dashboard-back.herokuapp.com/api/util/GetQuery?id=23&param=' + this._Activatedroute.snapshot.queryParams["id"]).subscribe((result: any[]) => {
        this.resultado = result;
    },  error => console.error(error));
  }

  delete(idGrupo,idSolicitud){
    console.log(idGrupo,idSolicitud);
    let grupo = {grupo:{idGrupo: idGrupo},idSolicitud:idSolicitud};
    this.http.post("http://www.apusaq.com/visordynamo/api/ItemGrupoData/DeleteDetails",grupo)
    .subscribe(result => {
    if(result.toString() == "exito"){
      console.log(result.toString());
      this._success.next(`eliminado correctamente`);
      location.reload();
    }else{
      this._success.next(result.toString());
    }
    });
  }

}
