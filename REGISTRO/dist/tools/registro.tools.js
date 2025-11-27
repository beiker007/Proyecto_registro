// Función para formatear un objeto de maquillaje como texto
function formatearUsuario(usuarioObj) {
    const nombre = usuarioObj.nombre;
    const cedula = usuarioObj.cedula;
    const correo = usuarioObj.correo;
    return `nombre: ${nombre}, cedula: ${cedula}, Código: ${correo}`;
}
export { formatearUsuario };
