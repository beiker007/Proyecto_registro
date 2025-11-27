var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function copyToClipboard(text) {
    return __awaiter(this, void 0, void 0, function* () {
        // Comprobar si la API moderna está disponible
        try {
            yield navigator.clipboard.writeText(text);
            alert("¡Texto copiado al portapapeles!");
        }
        catch (err) {
            alert(`Error al copiar texto con API moderna: ${err}`);
        }
    });
}
function capitalizeFirstOnly(text) {
    if (!text)
        return "";
    const trimmed = text.trim();
    if (trimmed.length === 0)
        return "";
    const first = trimmed.charAt(0).toUpperCase();
    const rest = trimmed.slice(1).toLowerCase();
    return first + rest;
}
export { copyToClipboard, capitalizeFirstOnly };
