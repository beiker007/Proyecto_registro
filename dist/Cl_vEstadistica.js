import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
export default class Cl_vEstadistica extends Cl_vGeneral {
    constructor() {
        super({ formName: "estadistica" });
        this.divChart = this.crearHTMLElement("divChart", { type: tHTMLElement.CONTAINER, refresh: () => { } });
        this.btVolver = this.crearHTMLButtonElement("btVolver", {
            onclick: () => { var _a, _b; return (_b = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.mostrarRegistro) === null || _b === void 0 ? void 0 : _b.call(_a); },
        });
    }
    render(data) {
        // If Chart.js is available, render a donut chart, otherwise show JSON
        const chartJsAvailable = typeof window.Chart !== "undefined";
        if (chartJsAvailable) {
            const Chart = window.Chart;
            // Clean container
            this.divChart.innerHTML = "<canvas id=\"estadistica_chart\"></canvas>";
            const canvas = this.divChart.querySelector("canvas");
            if (canvas) {
                const ctx = canvas.getContext("2d");
                // prepare data
                const values = [data.porcentajeEstudiantes, data.porcentajeNatural, data.porcentajeEmpresarial];
                const labels = ["Estudiantes", "Invitados Naturales", "Invitados Empresariales"];
                // Destroy previous chart if any
                if (canvas.__chart) {
                    canvas.__chart.destroy();
                }
                canvas.__chart = new Chart(ctx, {
                    type: "doughnut",
                    data: {
                        labels,
                        datasets: [{ data: values, backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"] }],
                    },
                    options: { responsive: true, maintainAspectRatio: false },
                });
            }
        }
        else {
            this.divChart.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        }
    }
}
