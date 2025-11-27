import Cl_mUsuario from "./Cl_mUsuario.js";

export interface iEstudiantes {
    carrera: string;
    proyecto: string;
    equipo: string;
    fechaRegistro?: string;
    horaRegistro?: string;
}

export class Cl_mEstudiantes extends Cl_mUsuario {
    private _carrera: string = "";
    private _proyecto: string = "";
    private _equipo: string = "";


    constructor({carrera, proyecto, equipo}: {carrera: string,
        proyecto: string;
        equipo: string;
        }) {
        super();
        this.carrera = carrera;
        this.proyecto = proyecto;
        this.equipo = equipo;
        this.setFechaHoraActual();
    }
    set carrera(carrera: string){
        this._carrera = carrera.trim().toUpperCase();
    }
    get carrera(): string {
        return this._carrera;
    }
    set proyecto(proyecto: string){
        this._proyecto = proyecto.trim().toUpperCase();
    }
    get proyecto(): string {
        return this._proyecto;
    }
    set equipo(equipo: string){
        this._equipo = equipo.trim().toUpperCase();
    }
    get equipo(): string {
        return this._equipo;
    }
   
    error(): string | false {
    const errores: string[] = [];

    if (this._carrera.length === 0) {
        errores.push("La carrera no puede estar vacía.");
    }

    if (this._equipo.length === 0) {
        errores.push("El equipo no puede estar vacío.");
    }

    if (errores.length > 0) {
        alert(errores.join("\n")); // Muestra todos los errores en una sola alerta
        return errores.join(" ");
    }

    return false}

    toJSON(): any {
        const base: any = super.toJSON();
        return {
            ...base,
            carrera: this.carrera,
            proyecto: this.proyecto,
            equipo: this.equipo,
            fechaRegistro: this.fechaRegistro,
            horaRegistro: this.horaRegistro,
        }

    }




}
