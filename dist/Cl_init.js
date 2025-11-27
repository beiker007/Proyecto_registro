import Cl_mRegistro from "./Cl_mRegistro.js";
import Cl_controlador from "./Cl_controlador.js";
import Cl_vUsuario from "./Cl_vUsuario.js";
import Cl_vRegistro from "./Cl_vRegistro.js";
import Cl_vInvitados from "./Cl_vInvitados.js";
import Cl_vEstudiantes from "./Cl_vEstudiantes.js";
import Cl_vEstadistica from "./Cl_vEstadistica.js";
const modelo = new Cl_mRegistro();
const vistaUsuario = new Cl_vUsuario();
const vistaRegistro = new Cl_vRegistro();
const vistaInvitados = new Cl_vInvitados();
const vistaEstudiantes = new Cl_vEstudiantes();
const vistaEstadistica = new Cl_vEstadistica();
const controlador = new Cl_controlador(modelo, vistaUsuario);
controlador.vistaRegistro = vistaRegistro;
controlador.vistaEstadistica = vistaEstadistica;
// Optionally keep references to other views (not strictly needed if they are embedded)
controlador.vista = vistaUsuario;
vistaUsuario.controlador = controlador;
vistaRegistro.controlador = controlador;
vistaInvitados.controlador = controlador;
vistaEstudiantes.controlador = controlador;
vistaEstadistica.controlador = controlador;
// Default view
controlador.mostrarUsuario();
// Wire additional back buttons that may not be created by the view classes
try {
    vistaInvitados.crearHTMLButtonElement("btBack", {
        onclick: () => controlador.mostrarUsuario(),
    });
}
catch (_a) { }
try {
    vistaEstudiantes.crearHTMLButtonElement("btBack", {
        onclick: () => controlador.mostrarUsuario(),
    });
}
catch (_b) { }
try {
    vistaEstadistica.crearHTMLButtonElement("btVolver", {
        onclick: () => controlador.mostrarRegistro(),
    });
}
catch (_c) { }
// Wire registro view button to return to usuario
try {
    vistaRegistro.crearHTMLButtonElement("btVolver", {
        onclick: () => controlador.mostrarUsuario(),
    });
}
catch (_d) { }
// Wire mainForm button to open registro
try {
    vistaUsuario.crearHTMLButtonElement("btRegistro", {
        onclick: () => controlador.mostrarRegistro(),
    });
}
catch (_e) { }
