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

  constructor() {
  }

  onAgregarPaciente(){
    console.log("dentro");
    let p = new Paciente(this.id_p);
    this.pacientes.push(p);
  }

}
