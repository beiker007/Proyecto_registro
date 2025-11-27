import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import Cl_controlador from "./Cl_controlador.js";
import type { iEstudiantes } from "./Cl_mEstudiantes.js";
import type { iInvitados } from "./Cl_mInvitadosClean.js";

export default class Cl_vRegistro extends Cl_vGeneral {
  private inputSearch!: HTMLInputElement;
  private selectTipo!: HTMLSelectElement;
  private btBuscar!: HTMLButtonElement;
  private btClear!: HTMLButtonElement;
  private btEstadistica!: HTMLButtonElement;
  private btVolver!: HTMLButtonElement;
  private divResults!: HTMLDivElement;

  constructor() {
    super({ formName: "registro" });

    this.inputSearch = this.crearHTMLInputElement("inputSearch", {
      oninput: () => {},
    });

    this.selectTipo = this.crearHTMLSelectElement("selectTipo", {
      elementsSource: ["Todos", "Estudiantes", "Invitados"],
      textExpresion: (x: any) => x,
    });

    this.btBuscar = this.crearHTMLButtonElement("btBuscar", {
      onclick: () => this.buscar(),
    });

    this.btClear = this.crearHTMLButtonElement("btClear", {
      onclick: () => this.limpiar(),
    });

    this.btEstadistica = this.crearHTMLButtonElement("btEstadistica", {
      onclick: () => this.abrirEstadistica(),
    });

    this.btVolver = this.crearHTMLButtonElement("btVolver", {
      onclick: () => this.volverUsuario(),
    });

    this.divResults = this.crearHTMLElement("divResults", {
      type: tHTMLElement.CONTAINER,
      refresh: () => this.buscar(),
    }) as HTMLDivElement;

    this.limpiar();
  }

  private buscar(): void {
    const query = this.inputSearch.value.trim().toLowerCase();
    const tipo = this.selectTipo.value;

    let resultsHtml = "";

    if (tipo === "Todos") {
      const estudiantes = this.controlador?.estudiantesRegistrados() || [];
      const invitados = this.controlador?.invitadosRegistrados() || [];

      const eFiltered = estudiantes.filter((s: iEstudiantes) => {
        const hay = `${s.carrera} ${s.proyecto} ${s.equipo}`.toLowerCase();
        return hay.includes(query);
      });

      const iFiltered = invitados.filter((i: iInvitados) => {
        const hay =
          `${i.tipoInvitado} ${i.tipoPersona} ${i.cargo} ${i.empresa}`.toLowerCase();
        return hay.includes(query);
      });

      if (eFiltered.length > 0) {
        resultsHtml += `<h3>Estudiantes (${eFiltered.length})</h3>`;
        resultsHtml += this.renderEstudiantes(eFiltered);
      }
      if (iFiltered.length > 0) {
        resultsHtml += `<h3>Invitados (${iFiltered.length})</h3>`;
        resultsHtml += this.renderInvitados(iFiltered);
      }
    } else if (tipo === "Estudiantes") {
      const estudiantes = this.controlador?.estudiantesRegistrados() || [];
      const filtered = estudiantes.filter((s: iEstudiantes) => {
        const hay = `${s.carrera} ${s.proyecto} ${s.equipo}`.toLowerCase();
        return hay.includes(query);
      });
      resultsHtml =
        `<h3>Estudiantes (${filtered.length})</h3>` +
        this.renderEstudiantes(filtered);
    } else if (tipo === "Invitados") {
      const invitados = this.controlador?.invitadosRegistrados() || [];
      const filtered = invitados.filter((i: iInvitados) => {
        const hay =
          `${i.tipoInvitado} ${i.tipoPersona} ${i.cargo} ${i.empresa}`.toLowerCase();
        return hay.includes(query);
      });
      resultsHtml =
        `<h3>Invitados (${filtered.length})</h3>` +
        this.renderInvitados(filtered);
    }

    this.divResults.innerHTML =
      resultsHtml || "<p>No se encontraron registros.</p>";
  }

  private renderEstudiantes(list: iEstudiantes[]): string {
    let html = `<table class="table"><thead><tr><th>Nombre</th><th>Proyecto</th><th>Equipo</th></tr></thead><tbody>`;
    list.forEach((s) => {
      html += `<tr><td>${s.carrera}</td><td>${s.proyecto}</td><td>${s.equipo}</td></tr>`;
    });
    html += `</tbody></table>`;
    return html;
  }

  private renderInvitados(list: iInvitados[]): string {
    let html = `<table class="table"><thead><tr><th>Tipo Invitado</th><th>Nombre</th><th>Cargo</th><th>Empresa</th></tr></thead><tbody>`;
    list.forEach((i) => {
      html += `<tr><td>${i.tipoInvitado}</td><td>${i.tipoPersona}</td><td>${
        i.cargo
      }</td><td>${i.empresa ? i.empresa : "-"}</td></tr>`;
    });
    html += `</tbody></table>`;
    return html;
  }

  private limpiar(): void {
    this.inputSearch.value = "";
    this.selectTipo.refill(["Todos", "Estudiantes", "Invitados"]);
    this.divResults.innerHTML = "";
  }

  private abrirEstadistica(): void {
    this.controlador?.mostrarEstadistica?.();
  }

  private volverUsuario(): void {
    this.controlador?.mostrarUsuario?.();
  }
}
