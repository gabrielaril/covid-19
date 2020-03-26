import { Component, OnInit, Input } from '@angular/core';
import { Paciente } from './paciente.model';
import { Ubicacion } from './ubicacion.model';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent {

  lat: number;
  lng: number;
  cord: string;
  pacientes: Paciente[] = [];
  paciente: Paciente;
  contador_p = 1;
  contador_u = 1;

  constructor() {
    this.paciente = new Paciente();
  }

  onAgregarUbicacion() {
    let temp = this.cord.split(",");
    this.lat = +temp[0];
    this.lng = +temp[1];
    this.paciente.ubicaciones.push(new Ubicacion(this.contador_u++, this.lat, this.lng));
    // reiniciamos variables
    this.cord = "";
    console.log("Ubicacion agregada...");
  }

  onAgregarPaciente() {
    this.paciente.id = this.contador_p++;
    this.pacientes.push(this.paciente);
    // reiniciamos variables
    this.paciente = new Paciente();
    this.contador_u = 1;
    this.imprimirPacientes();
    console.log("Paciente agregado...");
  }

  uploadFile(event) {
    if (event.target.files.length !== 1) {
      console.error('No file selected');
    } else {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        // handle data processing
        console.log(reader.result.toString());
      };
      reader.readAsText(event.target.files[0]);
    }
  }

  imprimirUbicacions(paciente: Paciente) {
    console.log(">>--------Ubicaciones---------<<");
    paciente.ubicaciones.forEach(u => {
      console.log("Id: " + u.id + " Latitud: " + u.latitud + " Longitud: " + u.longitud);
    });
  }

  imprimirPacientes() {
    this.pacientes.forEach(p => {
      console.log(">>--------Paciente---------<<");
      console.log("Id: " + p.id + " Edad: " + p.edad);
      this.imprimirUbicacions(p);
    });
  }
}
