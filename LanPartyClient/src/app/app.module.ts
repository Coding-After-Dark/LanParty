import { BrowserModule } from '@angular/platform-browser';
import { NgModule , OnInit} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ForsideComponent } from './forside/forside.component';
import { ApiComponent } from './api/api.component';
import { ListComponent } from './api/list/list.component';
import { EditComponent } from './api/edit/edit.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxElectronModule } from 'ngx-electron';
import { ConnectionService } from './services/connection.service';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap';
import { GameService } from './services/game.service';
import { SocketService } from './services/socket.service';

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
    BsDropdownModule.forRoot(),
    FormsModule,
    NgxElectronModule,
    FilterPipeModule,
    RouterModule.forRoot(
  appRoutes // <-- debugging purposes only
),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ConnectionService, GameService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
