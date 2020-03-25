export class Ubicacion {

    id: number;
    latitud: number;
    longitud: number;

    constructor(id: number,lat: number,lng: number) {
        this.id=id;
        this.latitud = lat;
        this.longitud = lng;
    }
}
