import { BrowserModule } from '@angular/platform-browser';
import { NgModule , OnInit} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ForsideComponent } from './forside/forside.component';
import { ApiComponent } from './api/api.component';
import { ListComponent } from './api/list/list.component';
import { EditComponent } from './api/edit/edit.component';
import { GameserviceService } from './gameservice.service';


const appRoutes: Routes = [
  { path: 'Forside', component: ForsideComponent },
  { path: 'Api', component: ApiComponent },
  { path: '',
    redirectTo: '/Forside',
    pathMatch: 'full'
  },
  { path: '**', component: ForsideComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ForsideComponent,
    ApiComponent,
    ListComponent,
    EditComponent
  ],
  imports: [
    RouterModule.forRoot(
  appRoutes // <-- debugging purposes only
),
    BrowserModule,
    HttpClientModule
  ],
  providers: [GameserviceService],
  bootstrap: [AppComponent]
})
export class AppModule{

}
