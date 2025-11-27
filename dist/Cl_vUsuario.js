import Cl_vEstudiantes from "./Cl_vEstudiantes.js";
import Cl_vInvitados from "./Cl_vInvitados.js";
import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
export default class Cl_vUsuario extends Cl_vGeneral {
    constructor() {
        super({ formName: "mainForm" });
        this._vInvitados = new Cl_vInvitados();
        this._vEstudiantes = new Cl_vEstudiantes();
        this.dataInvitados = this.crearHTMLElement("dataInvitados", { type: tHTMLElement.CONTAINER, refresh: () => { } });
        this.dataEstudiantes = this.crearHTMLElement("dataEstudiantes", { type: tHTMLElement.CONTAINER, refresh: () => { } });
        this.lblTotalRegistrados = this.crearHTMLElement("lblTotalRegistrados");
        this.btAgregarInvitados = this.crearHTMLButtonElement("btAgregarInvitados", {
            onclick: () => {
                this.show({ ver: false });
                this.vInvitados.show();
            },
        });
        this.btAgregarEstudiantes = this.crearHTMLButtonElement("btAgregarEstudiantes", {
            onclick: () => {
                this.show({ ver: false });
                this.vEstudiantes.show();
            },
        });
        this.dataInvitados.innerHTML = "";
        this.dataEstudiantes.innerHTML = "";
        this.vInvitados.show({ ver: false });
        this.vEstudiantes.show({ ver: false });
    }
    set controlador(controlador) {
        super.controlador = controlador;
        this.vInvitados.controlador = controlador;
        this.vEstudiantes.controlador = controlador;
    }
    get vInvitados() {
        return this._vInvitados;
    }
    get vEstudiantes() {
        return this._vEstudiantes;
    }
    reportarUsuario({ dataUsuario, TotalRegistrados, }) {
        const fila = `
                    <tr>
                    <td class="colString">${dataUsuario.nombre}</td>
                    <td class="colString">${dataUsuario.cedula}</td>                    
                    <td class="colString">${dataUsuario.correo}</td>
                    <td class="colString">${dataUsuario.tipoPersona ? dataUsuario.tipoPersona : "--"}</td>
                    <td class="colString">${dataUsuario.cargo ? dataUsuario.cargo : "--"}</td>
                    <td class="colString">${dataUsuario.empresa ? dataUsuario.empresa : "--"}</td>
                    <td class="colString">${dataUsuario.carrera ? dataUsuario.carrera : "--"}</td>
                    <td class="colString">${dataUsuario.proyecto ? dataUsuario.proyecto : "--"}</td>
                    <td class="colString">${dataUsuario.equipo ? dataUsuario.equipo : "--"}</td>
                    </tr>
                    `;
        if (dataUsuario.tipo === "Invitados") {
            const t = document.getElementById("mainForm_dataInvitados");
            if (t)
                t.innerHTML += fila;
        }
        else if (dataUsuario.tipo === "Estudiantes") {
            const t = document.getElementById("mainForm_dataEstudiantes");
            if (t)
                t.innerHTML += fila;
        }
        else {
            // fallback: append to Invitadoss by default (preserve data)
            this.dataInvitados.innerHTML += fila;
        }
        this.lblTotalRegistrados.innerHTML = TotalRegistrados.toFixed(2) + "$";
    }
    show({ ver = true } = { ver: true }) {
        super.show({ ver });
        if (ver) {
            this.vInvitados.show({ ver: false });
            this.vEstudiantes.show({ ver: false });
        }
    }
}
