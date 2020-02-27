import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { Router} from '@angular/router';
import { Location} from '@angular/common';
import { Jsonp } from '@angular/http';

@Component({
  selector: 'app-items-grupo',
  templateUrl: './items-grupo.component.html',
  styleUrls: ['./items-grupo.component.css']
})
export class ItemsGrupoComponent implements OnInit {

  seleccionarPro: string[];//FRANCIA 11022020

  //closeResult: string;
  public resultado: object;
  //public dropdown: object;
  public dropdown: any;
  public dropdown2: any;
  public idProyecto:string;
  public idGrupoE:string;
  public nombreProyecto:string;
  public tipoProyecto:string;
  public idDropDown:string;
  public idDropDown2:string;
  private _success = new Subject<string>();
  successMessage: string;
  staticAlertClosed = false;
  public total: number;
  public i:number = 0;

  private _success2 = new Subject<string>();
  successMessage2: string;

  public asociarPro : string[];//FRANCIA 11022020

  constructor(private modalService: NgbModal,private http: HttpClient,public _router: Router,public _location: Location) {
    this.http.get<any[]>('https://telefonica-dashboard-back.herokuapp.com/api/util/GetQuery?id=13').subscribe((result: any[]) => {
      this.resultado = result;
      console.log(this.resultado);
    }, error => console.error(error));

    this.http.get<any[]>('https://telefonica-dashboard-back.herokuapp.com/api/util/GetQuery?id=27').subscribe((result: any[]) => {
      this.dropdown = result;
      console.log(this.dropdown);
      this.total = Object.keys(this.dropdown).length;
    }, error => console.error(error));

    this.http.get<any[]>('https://telefonica-dashboard-back.herokuapp.com/api/util/GetQuery?id=26').subscribe((result: any[]) => {
      this.dropdown2 = result;
      console.log(this.dropdown2);
      this.total = Object.keys(this.dropdown2).length;
    }, error => console.error(error));

  }

  ngOnInit() {
    //alert para agregar
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(6000)
    ).subscribe(() => this.successMessage = null);
    //alert para eliminar y editar
    this._success2.subscribe((message) => this.successMessage2 = message);
    this._success2.pipe(
      debounceTime(6000)
    ).subscribe(() => this.successMessage2 = null);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.successMessage = "";
    this.idDropDown = "Seleccionar";
  }

  agregarGrupo(){
    let nom: string = (document.getElementById('idNombreGrupo') as HTMLInputElement).value; 
    //let tip:string = (document.getElementById('idTipoGrupo') as HTMLInputElement).value;
    let tip:string = (document.getElementById('dropdownMenu2') as HTMLInputElement).textContent;
    
    let grupo = {nombre: nom,tipo: tip};

    this.http.post("http://www.apusaq.com/visordynamo/api/ItemGrupoData/Insert",grupo)
    .subscribe(result => {
    if(result.toString() == "exito"){
      console.log(result.toString());
      this._success.next(`Grupo agregado correctamente`);
      location.reload();
    }
    if(result.toString() == "Campo vacio"){
      this._success.next(`Campos vacio`);
    }
    if(result.toString() == "error"){
      this._success.next(`Error al agregar grupo`);
    }
    });
  }

  open2(editar,idPro,nombrePro,tipoPro) {
    this.modalService.open(editar, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.idProyecto = idPro;
    this.nombreProyecto = nombrePro;
    this.tipoProyecto = tipoPro;
    this.idDropDown = "Seleccionar";
    this.idDropDown2 = tipoPro;
    this.successMessage = "";
  }

  open3(alerta,idGrupo) {
    this.modalService.open(alerta, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.idGrupoE = idGrupo;
  }

  open4(actualizar,idPro,nombrePro,tipoPro) {
    this.seleccionarPro = [];//FRANCIA 11022020
    this.modalService.open(actualizar, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.asociarPro = this.dropdown;//FRANCIA 11022020
    this.idProyecto = idPro;
    this.nombreProyecto = nombrePro;
    this.tipoProyecto = tipoPro;
    this.successMessage = "";
  }

  delete(id){
    console.log(id);
    let grupo = {idGrupo: id};

    this.http.post("http://www.apusaq.com/visordynamo/api/ItemGrupoData/Delete",grupo)
    .subscribe(result => {
    if(result.toString() == "eliminado"){
      console.log(result.toString());
      this._success2.next(`ID: ` + id + ` Grupo eliminado`);
      location.reload();
    }else{
      console.log(result.toString());
      this._success2.next(result.toString());
    }
    });
    this.idGrupoE = "";
    console.log(this.idGrupoE);
  }

  getidDropDown(idD){
    this.idDropDown = idD; 
    console.log(this.idDropDown);
  }

  getidDropDown2(idD){
    this.idDropDown2 = idD; 
    console.log(this.idDropDown2);
  }

  saveEdit(idE,proE){
    var nomE = (document.getElementById("idNomPro") as HTMLInputElement).value;
    //var tipE = (document.getElementById("idTipoPro") as HTMLInputElement).value;
    var tipE = (document.getElementById("dropdownMenu3") as HTMLInputElement).textContent;
    console.log(idE,nomE,proE,tipE);
    let grupo = {grupo:{idGrupo: idE,nombre: nomE,tipo: tipE},idSolicitud:proE};
    console.log(grupo);

    this.http.post("http://www.apusaq.com/visordynamo/api/ItemGrupoData/Edit",grupo)
    .subscribe(result => {
    if(result.toString() == "Actualizado con exito"){
      console.log(result.toString());
      this._success.next(`Editado con exito`);
      location.reload();
    }else{
      console.log(result.toString());
      this._success.next(result.toString());
    }
    });
  }

  actualizarGrupo(idE){

  }

  asociarProyectos(){
    console.log(this.seleccionarPro);

    console.log(this.seleccionarPro.length);

    for (let index = 0; index < this.seleccionarPro.length; index++) {
      const element = this.seleccionarPro[index];
      console.log(element);
      console.log(this.idProyecto);
    let valor = {grupo:{idGrupo: this.idProyecto},idsolicitud:element};

      this.http.post("http://www.apusaq.com/visordynamo/api/ItemGrupoData/Associate",valor)
        .subscribe(result => {
          if(result.toString() == "Actualizado con exito"){
            console.log(result.toString());
            this._success.next(`Asociado con exito`);
            location.reload();
          }else{
            console.log(result.toString());
            this._success.next(result.toString());
          }
        });

    }
  }

  //validarCheckbox(){
    //let count:number = parseInt((document.getElementById("totally") as HTMLInputElement).value);
    //let i:number = 0;
    //let valor;
    //while (i <= count-1) {
      //let Ischecked:boolean = (document.getElementById("py"+(i)) as HTMLInputElement).checked;
      
      //if (Ischecked) {
        /*let valor = (document.getElementById("py"+(i)) as HTMLInputElement).value;
        let[solicitud] = valor;
        console.log(solicitud);*/
        //let valor = {grupo:{idGrupo: this.idProyecto},idsolicitud:(document.getElementById("py"+(i)) as HTMLInputElement).value};
        //console.log(valor);
        //console.log("valor: " + valor + " num: " + i + " " + valor.length);
        /*(document.getElementById("hd"+i) as HTMLInputElement).value = valor;*/

        //this.http.post("http://localhost:5000/api/ItemGrupoData/Associate",valor)
        //.subscribe(result => {
          //if(result.toString() == "Actualizado con exito"){
            //console.log(result.toString());
            //this._success.next(`Asociado con exito`);
            //location.reload();
          //}else{
            //console.log(result.toString());
            //this._success.next(result.toString());
          //}
        //});

      //}else{
        /*(document.getElementById("hd"+i) as HTMLInputElement).value = '';*/
      //}
      //i = i + 1;
    //}
  //}

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
