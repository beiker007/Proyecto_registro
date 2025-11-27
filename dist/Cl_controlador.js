import { Cl_mEstudiantes } from "./Cl_mEstudiantes.js";
import { Cl_mInvitados } from "./Cl_mInvitadosClean.js";
export default class Cl_controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
    }
    agregarEstudiantes({ estudiantesData, callback, }) {
        this.modelo.agregarEstudiantes({
            estudiantes: new Cl_mEstudiantes(estudiantesData),
            callback: (error) => {
                callback(error);
            },
        });
    }
    agregarInvitados({ invitadosData, callback, }) {
        this.modelo.agregarInvitados({
            invitados: new Cl_mInvitados(invitadosData),
            callback: (error) => {
                callback(error);
            },
        });
    }
    estudiantesRegistrados() {
        return this.modelo.listarEstudiantes();
    }
    invitadosRegistrados() {
        return this.modelo.listarInvitados();
    }
    mostrarEstadistica() {
        var _a, _b, _c;
        // get stats from model and render chart
        const stats = this.modelo.getStatistics();
        this.vista.show({ ver: false });
        (_a = this.vistaRegistro) === null || _a === void 0 ? void 0 : _a.show({ ver: false });
        (_b = this.vistaEstadistica) === null || _b === void 0 ? void 0 : _b.render(stats);
        (_c = this.vistaEstadistica) === null || _c === void 0 ? void 0 : _c.show({ ver: true });
    }
    mostrarUsuario() {
        var _a, _b;
        (_a = this.vistaEstadistica) === null || _a === void 0 ? void 0 : _a.show({ ver: false });
        (_b = this.vistaRegistro) === null || _b === void 0 ? void 0 : _b.show({ ver: false });
        this.vista.show({ ver: true });
    }
    mostrarRegistro() {
        var _a, _b;
        (_a = this.vistaEstadistica) === null || _a === void 0 ? void 0 : _a.show({ ver: false });
        this.vista.show({ ver: false });
        (_b = this.vistaRegistro) === null || _b === void 0 ? void 0 : _b.show({ ver: true });
    }
}
