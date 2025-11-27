import { capitalizeFirstOnly } from "./tools/string.tools.js";

export default class Cl_mUsuario {
    public _nombre: string = "";
    public _cedula: string = "";
    public _correo: string = "";
    private _fechaRegistro: string = "";
    private _horaRegistro: string = "";

    constructor({ nombre, cedula, correo }: { nombre?: string; cedula?: string; correo?: string } = {}) {
        if (nombre) this.nombre = nombre;
        if (cedula) this.cedula = cedula;
        if (correo) this.correo = correo;
        // start with current time by default
        this.setFechaHoraActual();
    }

    set nombre(nombre: string) {
        this._nombre = capitalizeFirstOnly(nombre);
    }
    get nombre(): string {
        return this._nombre;
    }
    set cedula(cedula: string) {
        this._cedula = cedula.trim().toUpperCase();
    }
    get cedula(): string {
        return this._cedula;
    }
    set correo(correo: string) {
        this._correo = correo.trim();
    }
    get correo(): string {
        return this._correo;
    }

    // Registro time helpers
    private formatFecha(d: Date): string {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }
    private formatHora(d: Date): string {
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        const ss = String(d.getSeconds()).padStart(2, '0');
        return `${hh}:${mm}:${ss}`;
    }

    public setFechaActual(): void {
        this._fechaRegistro = this.formatFecha(new Date());
    }

    public setHoraActual(): void {
        this._horaRegistro = this.formatHora(new Date());
    }

    public setFechaHoraActual(): void {
        const d = new Date();
        this._fechaRegistro = this.formatFecha(d);
        this._horaRegistro = this.formatHora(d);
    }

    public get fechaRegistro(): string {
        return this._fechaRegistro;
    }

    public get horaRegistro(): string {
        return this._horaRegistro;
    }

    error(): string | false {
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
