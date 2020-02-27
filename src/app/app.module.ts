import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { ItemsGrupoComponent } from './items-grupo/items-grupo.component';
import { ItemsGrupoDetallealComponent } from './items-grupo-detalleal/items-grupo-detalleal.component';
import { SurveyComponent } from './survey/survey.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SurveyComponent,
    CounterComponent,
    ItemsGrupoComponent,
    ItemsGrupoDetallealComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgbPaginationModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'survey/:id', component: SurveyComponent },//Francia
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
