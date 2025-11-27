import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
export default class Cl_vEstudiantes extends Cl_vGeneral {
    constructor() {
        super({ formName: "Estudiantes" });
        this.btAgregarEstudiantes = this.crearHTMLButtonElement("btAgregarEstudiantes", {
            onclick: () => this.agregarEstudiantes(),
        });
        this.divEstudiantesRegistrados = this.crearHTMLElement("divEstudiantesRegistrados", {
            type: tHTMLElement.CONTAINER,
            refresh: () => this.mostrarEstudiantesRegistrados(),
        });
    }
    mostrarEstudiantesRegistrados() {
        var _a;
        this.divEstudiantesRegistrados.innerHTML = "";
        let estudiantes = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.estudiantesRegistrados();
        if (!estudiantes)
            return;
        estudiantes.forEach((estudiante) => {
            this.divEstudiantesRegistrados.innerHTML += `<tr>
            <td>${estudiante.carrera}</td>
            <td>${estudiante.proyecto}</td>
            <td>${estudiante.equipo}</td>
        </tr>`;
        });
    }
    agregarEstudiantes() {
        var _a;
        let carrera = prompt("Ingrese su nombre:");
        if (!carrera)
            return;
        let proyecto = prompt("Ingrese su proyecto:");
        if (!proyecto)
            return;
        let equipo = prompt("Ingrese la equipo a la cual pertenece:");
        (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.agregarEstudiantes({
            estudiantesData: {
                carrera: carrera,
                proyecto: proyecto,
                equipo: equipo || "",
            },
            callback: (error) => {
                if (error)
                    alert(error);
                this.refresh();
            },
        });
    }
}
