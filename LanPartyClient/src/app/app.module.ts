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
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';
import {NgxElectronModule} from 'ngx-electron';
import { ConnectionService } from './services/connection.service';

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
    EditComponent,
    ChatComponent
  ],
  imports: [
    FormsModule,
    NgxElectronModule,
    FilterPipeModule,
    RouterModule.forRoot(
  appRoutes // <-- debugging purposes only
),
    BrowserModule,
    HttpClientModule
  ],
  providers: [GameserviceService, ConnectionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
