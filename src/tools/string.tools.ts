async function copyToClipboard(text: string): Promise<void> {
  // Comprobar si la API moderna está disponible
  try {
    await navigator.clipboard.writeText(text);
    alert("¡Texto copiado al portapapeles!");
  } catch (err) {
    alert(`Error al copiar texto con API moderna: ${err}`);
  }
}

function capitalizeFirstOnly(text: string): string {
  if (!text) return "";
  const trimmed = text.trim();
  if (trimmed.length === 0) return "";
  const first = trimmed.charAt(0).toUpperCase();
  const rest = trimmed.slice(1).toLowerCase();
  return first + rest;
}

export { copyToClipboard, capitalizeFirstOnly };

