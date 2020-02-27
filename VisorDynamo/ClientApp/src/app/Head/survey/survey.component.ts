import { Component, Inject, Pipe, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { map, delay, reduce } from 'rxjs/operators';
import { Survey } from 'src/app/Head/survey/classSurvey';
import { Subscription, Subscriber, Observable } from 'rxjs';
import { getViewData } from '@angular/core/src/render3/instructions';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Parser } from '@angular/compiler/src/ml_parser/parser';
import { Jsonp, ResponseType } from '@angular/http';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.css']
})

@Pipe({ name: 'round' })


export class SurveyComponent implements OnInit {
    
    private _success = new Subject<string>();
    successMessage: string;
    public resultado: object;
    public resultado2: object;
    public resultado3:object;
    pIdProyecto: number;
    myAppUrl: string = "";
    val1 = false;
    val2 = false;
    val3 = false;
    val4 = false;
    val5 = false;
    val6 = false;

    ngOnInit() {
        /*this.route.paramMap.subscribe(params => { this.pIdProyecto = +params.get('id') });*/
        this._success.subscribe((message) => this.successMessage = message);
    }

    constructor(private route: ActivatedRoute, private http: HttpClient, private _Activatedroute: ActivatedRoute, @Inject('BASE_URL') baseUrl: string) {
      
        this.http.get<any[]>('https://telefonica-dashboard-back.herokuapp.com/api/util/GetQuery?id=20&param=33').subscribe((result: any[]) => {
        this.resultado = result;
        console.log(this.resultado);
        }, error => console.error(error));
        
        this.myAppUrl = baseUrl;

        this.route.paramMap.subscribe(params => { this.pIdProyecto = +params.get('id') });

        this.http.get<any[]>('https://telefonica-dashboard-back.herokuapp.com/api/util/GetQuery?id=24&param='+this.pIdProyecto).subscribe((result: any[]) => {
            this.resultado2 = result;
            console.log(this.resultado2);
        }, error => console.error(error));
        
        this.http.get<any[]>('https://telefonica-dashboard-back.herokuapp.com/api/util/GetQuery?id=25&param='+this.pIdProyecto).subscribe((result: any[]) => {
            this.resultado3 = result;
            console.log(this.resultado3);
        }, error => console.error(error));

    }

    insertSurvey(){

        let radio1 = '0';
        let radio2 = '0';
        let radio3 = '0';
        let radio4 = '0';
        let radio5 = '0';
        let textArea = '';
        let validacion = 0;

        for (var a = 0; a < document.getElementsByName('numero1').length; a++) {
            var check = (document.getElementsByName('numero1')[a] as HTMLInputElement).checked;
            var num1 = 1 + a;

            if (check) {
              radio1 = (document.getElementById(num1.toString()) as HTMLInputElement).value;
              if(radio1 == '0'){
              }
            }
        }
        for (var b = 0; b < document.getElementsByName('numero2').length; b++) {
            var check = (document.getElementsByName('numero2')[b] as HTMLInputElement).checked;
            var num2 = 1 + b;

            if (check) {
               radio2 = (document.getElementById(num2.toString()) as HTMLInputElement).value;
               if(radio2 == '0'){
                  
                }
            }
        }
        for (var c = 0; c < document.getElementsByName('numero3').length; c++) {
            var check = (document.getElementsByName('numero3')[c] as HTMLInputElement).checked;
            var num3 = 1 + c;

            if (check) {
               radio3 = (document.getElementById(num3.toString()) as HTMLInputElement).value;
               if(radio3 == '0'){
                  
                }
            }
        }
        for (var d = 0; d < document.getElementsByName('numero4').length; d++) {
            var check = (document.getElementsByName('numero4')[d] as HTMLInputElement).checked;
            var num4 = 1 + d;

            if (check) {
               radio4 = (document.getElementById(num4.toString()) as HTMLInputElement).value;
               if(radio4 == '0'){
                  
                }
            }
        }
        for (var e = 0; e < document.getElementsByName('numero5').length; e++) {
            var check = (document.getElementsByName('numero5')[e] as HTMLInputElement).checked;
            var num5 = 1 + e;

            if (check) {
               radio5 = (document.getElementById(num5.toString()) as HTMLInputElement).value;
               if(radio5 == '0'){
                  
                }
            }
        }
        if ((document.getElementById('idArea') as HTMLInputElement).value.length > 0) {
            textArea = (document.getElementById('idArea') as HTMLInputElement).value;
            if(textArea.length <= 0){
                  
            }
        }

        let survey = new Survey();
        survey.idProyecto = this.pIdProyecto;
        survey.idCorrelativo = 1;
        survey.resText = textArea;
        survey.resNumero = radio1 + "." + radio2 + "." + radio3 + "." + radio4 + "." + radio5;

        console.log(survey.resNumero);

        let postResponse:string = "";
        let res:boolean;
        
        /*this.http.post("http://localhost:52695/api/SurveyData/Insert", survey)
                 .subscribe(result => { console.log(result); });*/

        if(radio1 == '0'){
            validacion = 1;
            this.val1 = true;
        }else{
            validacion = 0;
            this.val1 = false;
        }
        if(radio2 == '0'){
            validacion = 1;
            this.val2 = true;
        }else{
            validacion = 0;
            this.val2 = false;
        }
        if(radio3 == '0'){
            validacion = 1;
            this.val3 = true;
        }else{
            validacion = 0;
            this.val3 = false;
        }
        if(radio4 == '0'){
            validacion = 1;
            this.val4 = true;
        }else{
            validacion = 0;
            this.val4 = false;
        }
        if(radio5 == '0'){
            validacion = 1;
            this.val5 = true;
        }else{
            validacion = 0;
            this.val5 = false;
        }
        /*if(textArea.length <= 0){
            validacion = 1;
            this.val6 = true;
        }else{
            validacion = 0;
            this.val6 = false;
        }*/
            
        if(validacion == 0 && this.val1 == false && this.val2 == false && this.val3 == false && this.val4 == false && this.val5 == false){
          this.http.post("http://www.apusaq.com/visordynamo/api/SurveyData/Insert", survey)
            .subscribe(result => {
                if(result.toString() == "exito"){
                    this._success.next(`Encuesta enviada correctamente`);
                }
                if(result.toString() == "error"){
               this._success.next(`Error al enviar encuesta`);
                }
            });
        }

    }
}

