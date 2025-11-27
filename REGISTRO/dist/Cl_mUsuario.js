import { capitalizeFirstOnly } from "./tools/string.tools.js";
export default class Cl_mUsuario {
    constructor({ nombre, cedula, correo } = {}) {
        this._nombre = "";
        this._cedula = "";
        this._correo = "";
        this._fechaRegistro = "";
        this._horaRegistro = "";
        if (nombre)
            this.nombre = nombre;
        if (cedula)
            this.cedula = cedula;
        if (correo)
            this.correo = correo;
        // start with current time by default
        this.setFechaHoraActual();
    }
    set nombre(nombre) {
        this._nombre = capitalizeFirstOnly(nombre);
    }
    get nombre() {
        return this._nombre;
    }
    set cedula(cedula) {
        this._cedula = cedula.trim().toUpperCase();
    }
    get cedula() {
        return this._cedula;
    }
    set correo(correo) {
        this._correo = correo.trim();
    }
    get correo() {
        return this._correo;
    }
    // Registro time helpers
    formatFecha(d) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }
    formatHora(d) {
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        const ss = String(d.getSeconds()).padStart(2, '0');
        return `${hh}:${mm}:${ss}`;
    }
    setFechaActual() {
        this._fechaRegistro = this.formatFecha(new Date());
    }
    setHoraActual() {
        this._horaRegistro = this.formatHora(new Date());
    }
    setFechaHoraActual() {
        const d = new Date();
        this._fechaRegistro = this.formatFecha(d);
        this._horaRegistro = this.formatHora(d);
    }
    get fechaRegistro() {
        return this._fechaRegistro;
    }
    get horaRegistro() {
        return this._horaRegistro;
    }
    error() {
        //Validar Nombre
        if (this._nombre.length === 0)
            return "El nombre no puede estar vacío.";
        //Validar Cedula
        if (this._cedula.length === 0)
            return "La cedula no puede estar vacío.";
        //Validar Correo
        if (this.correo.length === 0)
            return "El correo no puede estar vacío.";
        return false;
    }
    toJSON() {
        return {
            nombre: this.nombre,
            cedula: this.cedula,
            correo: this.correo,
            fechaRegistro: this.fechaRegistro,
            horaRegistro: this.horaRegistro,
        };
    }
}
