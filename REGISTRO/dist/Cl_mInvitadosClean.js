import Cl_mUsuario from "./Cl_mUsuario.js";
export class Cl_mInvitados extends Cl_mUsuario {
    constructor({ tipoInvitado = "Natural", tipoPersona, cargo, empresa, }) {
        super();
        this._tipoPersona = "";
        this._cargo = "";
        this._empresa = "";
        this._tipoInvitado = "Natural";
        this.tipoInvitado = tipoInvitado;
        this.tipoPersona = tipoPersona;
        this.cargo = cargo;
        this.empresa = empresa !== null && empresa !== void 0 ? empresa : "";
        this.setFechaHoraActual();
    }
    set tipoInvitado(tipo) {
        this._tipoInvitado = tipo;
    }
    get tipoInvitado() {
        return this._tipoInvitado;
    }
    set tipoPersona(tipoPersona) {
        this._tipoPersona = (tipoPersona || "").trim();
    }
    get tipoPersona() {
        return this._tipoPersona;
    }
    set cargo(cargo) {
        this._cargo = (cargo || "").trim();
    }
    get cargo() {
        return this._cargo;
    }
    set empresa(empresa) {
        this._empresa = (empresa || "").trim();
    }
    get empresa() {
        return this._empresa;
    }
    error() {
        const errores = [];
        if (this._tipoPersona.length === 0) {
            errores.push("El nombre del invitado no puede estar vacío.");
        }
        if (this._tipoInvitado.toLowerCase() === "empresarial" && this._empresa.length === 0) {
            errores.push("La empresa no puede estar vacía para invitados empresariales.");
        }
        if (errores.length > 0) {
            alert(errores.join("\n"));
            return errores.join(" ");
        }
        return false;
    }
    toJSON() {
        const base = super.toJSON();
        return Object.assign(Object.assign({}, base), { tipoInvitado: this.tipoInvitado, tipoPersona: this.tipoPersona, cargo: this.cargo, empresa: this.empresa, fechaRegistro: this.fechaRegistro, horaRegistro: this.horaRegistro });
    }
}
export default Cl_mInvitados;
