import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule} from '@agm/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PouchdbService } from './pouchdb.service';

@NgModule({
  declarations: [
    AppComponent,
    PacientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDSNzO2i5E48e_LyPkA8AmdPkoPglM61bc"
    }),
    FormsModule
  ],
  providers: [
    PouchdbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
