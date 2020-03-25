import { Ubicacion } from './ubicacion.model';
export class Paciente {

    id: number;
    ubicaciones: Ubicacion[];

    constructor(id: number) {
        this.id= id;
    }

    
}
