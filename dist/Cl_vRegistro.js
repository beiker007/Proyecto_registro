import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
export default class Cl_vRegistro extends Cl_vGeneral {
    constructor() {
        super({ formName: "registro" });
        this.inputSearch = this.crearHTMLInputElement("inputSearch", {
            oninput: () => { },
        });
        this.selectTipo = this.crearHTMLSelectElement("selectTipo", {
            elementsSource: ["Todos", "Estudiantes", "Invitados"],
            textExpresion: (x) => x,
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
        });
        this.limpiar();
    }
    buscar() {
        var _a, _b, _c, _d;
        const query = this.inputSearch.value.trim().toLowerCase();
        const tipo = this.selectTipo.value;
        let resultsHtml = "";
        if (tipo === "Todos") {
            const estudiantes = ((_a = this.controlador) === null || _a === void 0 ? void 0 : _a.estudiantesRegistrados()) || [];
            const invitados = ((_b = this.controlador) === null || _b === void 0 ? void 0 : _b.invitadosRegistrados()) || [];
            const eFiltered = estudiantes.filter((s) => {
                const hay = `${s.carrera} ${s.proyecto} ${s.equipo}`.toLowerCase();
                return hay.includes(query);
            });
            const iFiltered = invitados.filter((i) => {
                const hay = `${i.tipoInvitado} ${i.tipoPersona} ${i.cargo} ${i.empresa}`.toLowerCase();
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
        }
        else if (tipo === "Estudiantes") {
            const estudiantes = ((_c = this.controlador) === null || _c === void 0 ? void 0 : _c.estudiantesRegistrados()) || [];
            const filtered = estudiantes.filter((s) => {
                const hay = `${s.carrera} ${s.proyecto} ${s.equipo}`.toLowerCase();
                return hay.includes(query);
            });
            resultsHtml = `<h3>Estudiantes (${filtered.length})</h3>` + this.renderEstudiantes(filtered);
        }
        else if (tipo === "Invitados") {
            const invitados = ((_d = this.controlador) === null || _d === void 0 ? void 0 : _d.invitadosRegistrados()) || [];
            const filtered = invitados.filter((i) => {
                const hay = `${i.tipoInvitado} ${i.tipoPersona} ${i.cargo} ${i.empresa}`.toLowerCase();
                return hay.includes(query);
            });
            resultsHtml = `<h3>Invitados (${filtered.length})</h3>` + this.renderInvitados(filtered);
        }
        this.divResults.innerHTML = resultsHtml || "<p>No se encontraron registros.</p>";
    }
    renderEstudiantes(list) {
        let html = `<table class="table"><thead><tr><th>Carrera</th><th>Proyecto</th><th>Equipo</th></tr></thead><tbody>`;
        list.forEach((s) => {
            html += `<tr><td>${s.carrera}</td><td>${s.proyecto}</td><td>${s.equipo}</td></tr>`;
        });
        html += `</tbody></table>`;
        return html;
    }
    renderInvitados(list) {
        let html = `<table class="table"><thead><tr><th>Tipo Invitado</th><th>Nombre</th><th>Cargo</th><th>Empresa</th></tr></thead><tbody>`;
        list.forEach((i) => {
            html += `<tr><td>${i.tipoInvitado}</td><td>${i.tipoPersona}</td><td>${i.cargo}</td><td>${i.empresa ? i.empresa : "-"}</td></tr>`;
        });
        html += `</tbody></table>`;
        return html;
    }
    limpiar() {
        this.inputSearch.value = "";
        this.selectTipo.refill(["Todos", "Estudiantes", "Invitados"]);
        this.divResults.innerHTML = "";
    }
    abrirEstadistica() {
        var _a, _b;
        (_b = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.mostrarEstadistica) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    volverUsuario() {
        var _a, _b;
        (_b = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.mostrarUsuario) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
}
