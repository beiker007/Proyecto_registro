import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import Cl_controlador from "./Cl_controlador.js";

export default class Cl_vEstadistica extends Cl_vGeneral {
	private divChart!: HTMLDivElement;
	private btVolver!: HTMLButtonElement;

	constructor() {
		super({ formName: "estadistica" });
		this.divChart = this.crearHTMLElement("divChart", { type: tHTMLElement.CONTAINER, refresh: () => {} }) as HTMLDivElement;
		this.btVolver = this.crearHTMLButtonElement("btVolver", {
			onclick: () => this.controlador?.mostrarRegistro?.(),
		});
	}

	render(data: any) {
		// If Chart.js is available, render a donut chart, otherwise show JSON
		const chartJsAvailable = typeof (window as any).Chart !== "undefined";
		if (chartJsAvailable) {
			const Chart = (window as any).Chart;
			// Clean container
			this.divChart.innerHTML = "<canvas id=\"estadistica_chart\"></canvas>";
			const canvas = this.divChart.querySelector("canvas") as HTMLCanvasElement;
			if (canvas) {
				const ctx = canvas.getContext("2d");
				// prepare data
				const values = [data.porcentajeEstudiantes, data.porcentajeNatural, data.porcentajeEmpresarial];
				const labels = ["Estudiantes", "Invitados Naturales", "Invitados Empresariales"];
				// Destroy previous chart if any
				if ((canvas as any).__chart) { (canvas as any).__chart.destroy(); }
				(canvas as any).__chart = new Chart(ctx, {
					type: "doughnut",
					data: {
						labels,
						datasets: [{ data: values, backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"] }],
					},
					options: { responsive: true, maintainAspectRatio: false },
				});
			}
		} else {
			this.divChart.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
		}
	}
}