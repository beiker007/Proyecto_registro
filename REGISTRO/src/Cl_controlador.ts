import { Cl_mEstudiantes } from "./Cl_mEstudiantes.js";
import type { iEstudiantes } from "./Cl_mEstudiantes.js";
import { Cl_mInvitados } from "./Cl_mInvitadosClean.js";
import type { iInvitados } from "./Cl_mInvitadosClean.js";
import Cl_vUsuario from "./Cl_vUsuario.js";
import type Cl_vRegistro from "./Cl_vRegistro.js";
import type Cl_vEstadistica from "./Cl_vEstadistica.js";
import Cl_mRegistro from "./Cl_mRegistro.js";   

export default class Cl_controlador {
    public modelo: Cl_mRegistro;
    public vista: Cl_vUsuario;
    public vistaRegistro?: Cl_vRegistro;
    public vistaEstadistica?: Cl_vEstadistica;
    constructor(modelo: Cl_mRegistro, vista: Cl_vUsuario) {
        this.modelo = modelo;
        this.vista = vista;
    }
    agregarEstudiantes({
        estudiantesData,
        callback, 
}: {
    estudiantesData: iEstudiantes;
    callback: (error: string | false) => void;
}): void {
    this.modelo.agregarEstudiantes({
        estudiantes: new Cl_mEstudiantes(estudiantesData),
        callback: (error: string | false) => {
            callback(error);
        },
    });
}
agregarInvitados({
    invitadosData,
    callback,
}:{
    invitadosData: iInvitados;
    callback: (error: string | false) => void;
}): void {
    this.modelo.agregarInvitados({
        invitados: new Cl_mInvitados(invitadosData),
        callback: (error: string | false) => {
            callback(error);
        }, 
    });
}


estudiantesRegistrados(): iEstudiantes[] {
    return this.modelo.listarEstudiantes();
}

invitadosRegistrados(): iInvitados[] {
    return this.modelo.listarInvitados();


}

    mostrarEstadistica(): void {
        // get stats from model and render chart
        const stats = this.modelo.getStatistics();
        this.vista.show({ ver: false });
        this.vistaRegistro?.show({ ver: false });
        this.vistaEstadistica?.render(stats);
        this.vistaEstadistica?.show({ ver: true });
    }
    mostrarUsuario(): void {
        this.vistaEstadistica?.show({ ver: false });
        this.vistaRegistro?.show({ ver: false });
        this.vista.show({ ver: true });
    }
    mostrarRegistro(): void {
        this.vistaEstadistica?.show({ ver: false });
        this.vista.show({ ver: false });
        this.vistaRegistro?.show({ ver: true });
    }
}