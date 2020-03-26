import { Ubicacion } from './ubicacion.model';
export class Paciente {

    id: number;
    edad: number;
    ubicaciones: Ubicacion[];

    constructor(obj?: any) {
        Object.assign(this, obj);
        this.ubicaciones = [];
    }

}
