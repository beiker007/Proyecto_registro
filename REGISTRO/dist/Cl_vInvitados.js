import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
export default class Cl_vInvitados extends Cl_vGeneral {
    constructor() {
        super({ formName: "Invitados" });
        this.btAgregarInvitado = this.crearHTMLButtonElement("btAgregarInvitado", {
            onclick: () => this.agregarInvitado(),
        });
        this.divInvitadosRegistrados = this.crearHTMLElement("divInvitadosRegistrados", {
            type: tHTMLElement.CONTAINER,
            refresh: () => this.mostrarInvitadosRegistrados(),
        });
    }
    mostrarInvitadosRegistrados() {
        var _a;
        this.divInvitadosRegistrados.innerHTML = "";
        let invitados = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.invitadosRegistrados();
        if (!invitados)
            return;
        invitados.forEach((invitados) => {
            this.divInvitadosRegistrados.innerHTML += `<tr>
            <td>${invitados.tipoInvitado}</td>
            <td>${invitados.tipoPersona}</td>
            <td>${invitados.cargo}</td>
            <td>${invitados.empresa ? invitados.empresa : "-"}</td>
        </tr>`;
        });
    }
    agregarInvitado() {
        var _a;
        let tipoInvitado = prompt("Ingrese el tipo de invitado (Natural / Empresarial):");
        if (!tipoInvitado)
            return;
        tipoInvitado = (tipoInvitado || "").trim();
        const tipoInv = tipoInvitado.toLowerCase() === "empresarial" ? "Empresarial" : "Natural";
        let tipoPersona = prompt("Ingrese su nombre:");
        if (!tipoPersona)
            return;
        let cargo = prompt("Ingrese su cargo:");
        if (!cargo)
            return;
        let empresa = undefined;
        if (tipoInv === "Empresarial") {
            empresa = prompt("Ingrese la empresa a la cual pertenece:") || "";
        }
        (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.agregarInvitados({
            invitadosData: {
                tipoInvitado: tipoInv,
                tipoPersona: tipoPersona,
                cargo: cargo,
                empresa: empresa || "",
            },
            callback: (error) => {
                if (error)
                    alert(error);
                this.refresh();
            },
        });
    }
}
