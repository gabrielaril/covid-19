import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Url } from 'src/app/utilerias/url';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Paciente } from './paciente.model';

const clave = 'bien:';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ExpedienteService {
  private pacienteUrl = Url.base + Url.paciente;

  constructor(
    private http: HttpClient) {
  }

  savePaciente(paciente: Paciente): Observable<any> {    
    return this.http.post(this.pacienteUrl, JSON.stringify(paciente), httpOptions)
    .pipe(
      map(res => {
        console.log(res);
      }),
      catchError(err => {
        throw new Error(err);
      })
    );
  }

  getPacienteById(id: number): Observable<Paciente> {
    httpOptions.headers =
      httpOptions.headers.set('id', id.toString());

    return this.http.post<Paciente>(this.pacienteUrl, null, httpOptions)
      .pipe(
        map((paciente: Paciente) => {          
          return paciente;
        }),
        catchError(err => {
          throw new Error(err);
        })
      );
  }

  getPacientes(): Observable<Paciente[]> {
    return this.http.post<Paciente[]>(this.pacienteUrl, null)
      .pipe(
        map((res: Paciente[]) => {          
          // --
          return res;
        }),
        catchError(err => {
          throw new Error(err);
        })
      );
  }
}
