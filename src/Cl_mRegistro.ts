import Cl_mUsuario from "./Cl_mUsuario.js";
import {Cl_mEstudiantes} from "./Cl_mEstudiantes.js";
import type { iEstudiantes } from "./Cl_mEstudiantes.js";
import {Cl_mInvitados} from "./Cl_mInvitadosClean.js";
import type { iInvitados } from "./Cl_mInvitadosClean.js";

export default class Cl_mRegistro{
    private cntEstudiantes: number = 0;
    private cntInvitados: number = 0;
    private cntInvitadosNatural: number = 0;
    private cntInvitadosEmpresarial: number = 0;
    private registro: any[] = [];


    procesarUsuario(mUsuario: Cl_mUsuario){
        if(mUsuario instanceof Cl_mEstudiantes){
        this.cntEstudiantes++;}
        
        if(mUsuario instanceof Cl_mInvitados){
            this.cntInvitados++;
        }
    }

    totalRegistrados(): number {
       return this.cntEstudiantes + this.cntInvitados;
    }

    getStatistics() {
        const total = this.totalRegistrados();
        const estudiantes = this.cntEstudiantes;
        const invitadosNatural = this.cntInvitadosNatural;
        const invitadosEmpresarial = this.cntInvitadosEmpresarial;
        const porcentajeEstudiantes = total ? (estudiantes / total) * 100 : 0;
        const porcentajeNatural = total ? (invitadosNatural / total) * 100 : 0;
        const porcentajeEmpresarial = total ? (invitadosEmpresarial / total) * 100 : 0;
        return {
            total,
            estudiantes,
            invitadosNatural,
            invitadosEmpresarial,
            porcentajeEstudiantes,
            porcentajeNatural,
            porcentajeEmpresarial,
        };
    }

    
    listar() {
        let lista: any[] = [];
        this.registro.forEach((usuario) => {
            if (usuario && typeof usuario.toJSON === "function") lista.push(usuario.toJSON());
            else lista.push(usuario);
        });
        return lista;
    }

    listarEstudiantes(): iEstudiantes[] {
        const lista: iEstudiantes[] = [];
        this.registro.forEach((usuario) => {
            if (usuario instanceof Cl_mEstudiantes) lista.push(usuario.toJSON());
        });
        return lista;
    }

    listarInvitados(): iInvitados[] {
        const lista: iInvitados[] = [];
        this.registro.forEach((usuario) => {
            if (usuario instanceof Cl_mInvitados) lista.push(usuario.toJSON());
        });
        return lista;
    }

    agregarEstudiantes({ estudiantes, callback }: { estudiantes: Cl_mEstudiantes; callback: (error: string | false) => void }): void {
        let error = estudiantes.error();
        if (error) {
            callback(error);
            return;
        }
        this.registro.push(estudiantes);
        this.cntEstudiantes++;
        callback(false);
    }

    agregarInvitados({ invitados, callback }: { invitados: Cl_mInvitados; callback: (error: string | false) => void }): void {
        let error = invitados.error();
        if (error) {
            callback(error);
            return;
        }
        this.registro.push(invitados);
        this.cntInvitados++;
        if (invitados.tipoInvitado && invitados.tipoInvitado.toLowerCase() === "empresarial") {
            this.cntInvitadosEmpresarial++;
        } else {
            this.cntInvitadosNatural++;
        }
        callback(false);
    }





}