import { Cl_mEstudiantes } from "./Cl_mEstudiantes.js";
import type { iEstudiantes }  from "./Cl_mEstudiantes.js";
import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import Cl_controlador from "./Cl_controlador.js";

export default class Cl_vEstudiantes extends Cl_vGeneral {
private btAgregarEstudiantes!: HTMLButtonElement;
private divEstudiantesRegistrados!: HTMLDivElement;

  constructor() {
    super({ formName: "Estudiantes" });
    this.btAgregarEstudiantes = this.crearHTMLButtonElement("btAgregarEstudiantes", {
      onclick: () => this.agregarEstudiantes(),
    });
    this.divEstudiantesRegistrados = this.crearHTMLElement("divEstudiantesRegistrados", {
      type: tHTMLElement.CONTAINER,
      refresh: () => this.mostrarEstudiantesRegistrados(),
    }) as HTMLDivElement;
  }
  mostrarEstudiantesRegistrados() {
    this.divEstudiantesRegistrados.innerHTML = "";
    let estudiantes = this.controlador?.estudiantesRegistrados();
    if (!estudiantes) return;
    estudiantes.forEach((estudiante: iEstudiantes) => {
      this.divEstudiantesRegistrados.innerHTML += `<tr>
            <td>${estudiante.carrera}</td>
            <td>${estudiante.proyecto}</td>
            <td>${estudiante.equipo}</td>
        </tr>`;
    });
  }
  agregarEstudiantes() {
    let carrera = prompt("Ingrese su nombre:");
    if (!carrera) return;
    let proyecto = prompt("Ingrese su proyecto:");
    if (!proyecto) return;
    let equipo = prompt("Ingrese la equipo a la cual pertenece:");
      this.controlador?.agregarEstudiantes({
      estudiantesData: {
        carrera: carrera,
        proyecto: proyecto,
        equipo: equipo || "",
      },
      callback: (error: string | false) => {
        if (error) alert(error);
        this.refresh();
      },
    });
  }
}