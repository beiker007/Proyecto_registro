import Cl_mUsuario from "./Cl_mUsuario.js";
export class Cl_mEstudiantes extends Cl_mUsuario {
    constructor({ carrera, proyecto, equipo }) {
        super();
        this._carrera = "";
        this._proyecto = "";
        this._equipo = "";
        this.carrera = carrera;
        this.proyecto = proyecto;
        this.equipo = equipo;
        this.setFechaHoraActual();
    }
    set carrera(carrera) {
        this._carrera = carrera.trim().toUpperCase();
    }
    get carrera() {
        return this._carrera;
    }
    set proyecto(proyecto) {
        this._proyecto = proyecto.trim().toUpperCase();
    }
    get proyecto() {
        return this._proyecto;
    }
    set equipo(equipo) {
        this._equipo = equipo.trim().toUpperCase();
    }
    get equipo() {
        return this._equipo;
    }
    error() {
        const errores = [];
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
        return false;
    }
    toJSON() {
        const base = super.toJSON();
        return Object.assign(Object.assign({}, base), { carrera: this.carrera, proyecto: this.proyecto, equipo: this.equipo, fechaRegistro: this.fechaRegistro, horaRegistro: this.horaRegistro });
    }
}
