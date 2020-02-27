import { Component, Inject, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})

@Pipe({ name: 'round' })

export class HomeComponent {
    //public forecasts: WeatherForecast[];
  public resultado: object;
  closeResult: string;

    constructor(private http: HttpClient,
        //private errorHandleService: ErrorHandleService,
      private modalService: NgbModal,
        private _Activatedroute: ActivatedRoute,
        @Inject('BASE_URL') baseUrl: string) {

        this.http.get<any[]>('https://telefonica-dashboard-back.herokuapp.com/api/util/GetQuery?id=13').subscribe((result: any[]) => {

            this.resultado = result;
            console.log(this.resultado);


        }, error => console.error(error));

  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
