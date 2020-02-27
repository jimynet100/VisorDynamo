import { Component, Inject, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//import { ErrorHandleService } from './../shared/services/error-handle.service';


@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
})

@Pipe({ name: 'round' })

export class CounterComponent {
    //public forecasts: WeatherForecast[];
    public resultado: object;
    public cantidad: number;
    public avance: number;
    public nombre: string;
    public passrate: number;
  public pendiente: number;
  public pendientenqa: number;
  public corregido: number;
  public error: number;
  public hllcnt: number;
  public hallazgo: object;
  public caspru: object;
  public casprux: object;
  closeResult: string;

    constructor(private http: HttpClient,
        //private errorHandleService: ErrorHandleService,
      private _Activatedroute: ActivatedRoute,
      private modalService: NgbModal,
        @Inject('BASE_URL') baseUrl: string) {
        const uri = decodeURIComponent(
            '/api/util/GetQuery?id=10'
        );

        this.http.get<any[]>('https://telefonica-dashboard-back.herokuapp.com/api/util/GetQuery?id=10&param=' + this._Activatedroute.snapshot.queryParams["id"]).subscribe((result: any[]) => {
 

            this.resultado = result;
          console.log(result);
            let counters = result.reduce((p, n) => {
                if (p[n.llave]) { p[n.llave] += n.Q; }
                else { p[n.llave] = n.Q; }
                return p;
            }, []);

            this.nombre = result[0].llave;
            console.log(this.nombre);
            this.cantidad = result.reduce((acc, val) => acc += val.Q, 0);

          this.pendiente = result.reduce((acc, val) => acc += val.Pendiente, 0);

          this.pendientenqa = result.reduce((acc, val) => acc += val.PendientenQA, 0);

            this.error = result.reduce((acc, val) => acc += val.Errores, 0);

            this.avance = 100 * (this.cantidad - this.pendiente) / this.cantidad;

            this.passrate = 100 * (this.cantidad - this.pendiente - this.error) / (this.cantidad - this.pendiente);



        }, error => console.error(error));



        this.http.get<any[]>('https://telefonica-dashboard-back.herokuapp.com/api/util/GetQuery?id=11&param=' + this._Activatedroute.snapshot.queryParams["id"]).subscribe((result: any[]) => {

          this.hallazgo = result;
          this.hllcnt = result.length;
          var difficult_tasks = result.filter((result) => result.Estado == "Corregido");
          this.corregido = difficult_tasks.length;


          console.log(difficult_tasks);

        }, error => console.error(error));
    }

  open(content,pr_id,tema) {
    this.caspru = null;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    (<HTMLSpanElement>document.getElementById('headertxt')).innerText = tema;
    this.http.get<any[]>('https://telefonica-dashboard-back.herokuapp.com/api/util/GetQuery?id=12&param=' + pr_id).subscribe((result: any[]) => {
      this.caspru = result;

      var groups = result.reduce(function (obj, item) {
        obj[item.escenario] = obj[item.escenario] || [];
        obj[item.escenario].push(item);
        return obj;
      }, {});
      var myArray = Object.keys(groups).map(function (key) {
        return { torneo: key, requerimientos: groups[key] };
      });
      this.casprux = myArray;
      console.log(this.casprux);


    }, error => console.error(error));
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
