import type { iInvitados }  from "./Cl_mInvitadosClean.js";
import { Cl_mInvitados } from "./Cl_mInvitadosClean.js";
import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import Cl_controlador from "./Cl_controlador.js";

export default class Cl_vInvitados extends Cl_vGeneral {
private btAgregarInvitado: HTMLButtonElement;
private divInvitadosRegistrados: HTMLDivElement;

  constructor() {
    super({ formName: "Invitados" });
    this.btAgregarInvitado = this.crearHTMLButtonElement("btAgregarInvitado", {
      onclick: () => this.agregarInvitado(),
    });
    this.divInvitadosRegistrados = this.crearHTMLElement("divInvitadosRegistrados", {
      type: tHTMLElement.CONTAINER,
      refresh: () => this.mostrarInvitadosRegistrados(),
    }) as HTMLDivElement;
  }
  mostrarInvitadosRegistrados() {
    this.divInvitadosRegistrados.innerHTML = "";
    let invitados = this.controlador?.invitadosRegistrados();
    if (!invitados) return;
    invitados.forEach((invitados: iInvitados) => {
      this.divInvitadosRegistrados.innerHTML += `<tr>
            <td>${invitados.tipoInvitado}</td>
            <td>${invitados.tipoPersona}</td>
            <td>${invitados.cargo}</td>
            <td>${invitados.empresa ? invitados.empresa : "-"}</td>
        </tr>`;
    });
  }
  agregarInvitado() {
    let tipoInvitado = prompt("Ingrese el tipo de invitado (Natural / Empresarial):");
    if (!tipoInvitado) return;
    tipoInvitado = (tipoInvitado || "").trim();
    const tipoInv = tipoInvitado.toLowerCase() === "empresarial" ? "Empresarial" : "Natural";

    let tipoPersona = prompt("Ingrese su nombre:");
    if (!tipoPersona) return;
    let cargo = prompt("Ingrese su cargo:");
    if (!cargo) return;
    let empresa: string | undefined = undefined;
    if (tipoInv === "Empresarial") {
      empresa = prompt("Ingrese la empresa a la cual pertenece:") || "";
    }
      this.controlador?.agregarInvitados({
      invitadosData: {
        tipoInvitado: tipoInv as "Natural" | "Empresarial",
        tipoPersona: tipoPersona,
        cargo: cargo,
        empresa: empresa || "",
      },
      callback: (error: string | false) => {
        if (error) alert(error);
        this.refresh();
      },
    });
  }
}