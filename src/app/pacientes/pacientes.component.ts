import { Component, OnInit } from '@angular/core';
import { Paciente } from './paciente.model';
import { Ubicacion } from './ubicacion.model';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent {

  pacientes : Paciente[] = [new Paciente(1),new Paciente(2)];
  id_p : number;
  ubicacion : Ubicacion;
  latitud : number = 20.6748751;
  longitd : number = -103.3589671;

  constructor() {    
  }

  onAgregarPaciente(){
    console.log("dentro");
    let p = new Paciente(this.id_p);
    this.pacientes.push(p);
  }

}
