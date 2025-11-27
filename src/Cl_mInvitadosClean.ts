import Cl_mUsuario from "./Cl_mUsuario.js";

export interface iInvitados {
  tipoInvitado: "Natural" | "Empresarial";
  tipoPersona: string;
  cargo: string;
  empresa?: string;
  fechaRegistro?: string;
  horaRegistro?: string;
}

export class Cl_mInvitados extends Cl_mUsuario {
  private _tipoPersona: string = "";
  private _cargo: string = "";
  private _empresa: string = "";
  private _tipoInvitado: "Natural" | "Empresarial" = "Natural";

  constructor({
    tipoInvitado = "Natural",
    tipoPersona,
    cargo,
    empresa,
  }: {
    tipoInvitado?: "Natural" | "Empresarial";
    tipoPersona: string;
    cargo: string;
    empresa?: string;
  }) {
    super();
    this.tipoInvitado = tipoInvitado;
    this.tipoPersona = tipoPersona;
    this.cargo = cargo;
    this.empresa = empresa ?? "";
    this.setFechaHoraActual();
  }

  set tipoInvitado(tipo: "Natural" | "Empresarial") {
    this._tipoInvitado = tipo;
  }
  get tipoInvitado(): "Natural" | "Empresarial" {
    return this._tipoInvitado;
  }

  set tipoPersona(tipoPersona: string) {
    this._tipoPersona = (tipoPersona || "").trim();
  }
  get tipoPersona(): string {
    return this._tipoPersona;
  }

  set cargo(cargo: string) {
    this._cargo = (cargo || "").trim();
  }
  get cargo(): string {
    return this._cargo;
  }

  set empresa(empresa: string) {
    this._empresa = (empresa || "").trim();
  }
  get empresa(): string {
    return this._empresa;
  }

  error(): string | false {
    const errores: string[] = [];
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

  toJSON(): any {
    const base: any = super.toJSON();
    return {
      ...base,
      tipoInvitado: this.tipoInvitado,
      tipoPersona: this.tipoPersona,
      cargo: this.cargo,
      empresa: this.empresa,
      fechaRegistro: this.fechaRegistro,
      horaRegistro: this.horaRegistro,
    };
  }
}

export default Cl_mInvitados;
