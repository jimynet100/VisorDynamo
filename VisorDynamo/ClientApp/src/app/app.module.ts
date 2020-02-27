import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";
import { CustomMaterialModule } from "./core/material.module";
import { NgSelectModule } from '@ng-select/ng-select';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './wHead/nav-menu/nav-menu.component';
import { HomeComponent } from './wHead/home/home.component';
import { CounterComponent } from './Head/counter/counter.component';
import { ItemsGrupoComponent } from './wHead/items-grupo/items-grupo.component';
import { ItemsGrupoDetallealComponent } from './wHead/items-grupo-detalleal/items-grupo-detalleal.component';
import { SurveyComponent } from './Head/survey/survey.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  {
    path: '', component: HomeLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'items-grupo', component: ItemsGrupoComponent },
      { path: 'items-grupo-detalleal', component: ItemsGrupoDetallealComponent }
    ]
  },
  {
    path: 'oth', component: LoginLayoutComponent, data: { title: 'First Component' },
    children: [
      //{ path: '', component: LoginComponent }
      { path: 'counter', component: CounterComponent },
      { path: 'survey/:id', component: SurveyComponent }
    ]
  }
 
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SurveyComponent,
    CounterComponent,
    ItemsGrupoComponent,
    LoginLayoutComponent,
    HomeLayoutComponent,
    ItemsGrupoDetallealComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CustomMaterialModule,
    NgbPaginationModule,
    NgbModule,
    NgbPaginationModule,
    NgSelectModule,
    NgbAlertModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: false } // <-- debugging purposes only
    )
    //RouterModule.forRoot([
    //  { path: '', component: HomeComponent, pathMatch: 'full' },
    //  { path: 'counter', component: CounterComponent },
    //  { path: 'items-grupo', component: ItemsGrupoComponent },
    //  { path: 'items-grupo-detalleal', component: ItemsGrupoDetallealComponent },      
    //  { path: 'survey/:id', component: SurveyComponent },//Francia
      
    //])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
