export function render(results, settings) {
	//console.log(results)
	console.log(settings)
	const panel = document.getElementById("panel");
	const tbody = document.getElementById("tableBody");
	const tableHead = document.getElementById("tableHead");
	const viewMode = "Table";

	panel.innerHTML = "";
	tbody.innerHTML = "";


 	if (settings.viewMode === "Table") {
		tableHead.innerHTML = `
			<tr>
				<th>Step</th>
				<th>Stops</th>
				<th>Strip</th>
				<th>Exposure</th>
			</tr>
		`;
	}

	results.forEach(d => {

		console.log("renderer.26, viewMode:",viewMode,", step:",d.step,", isBase:",d.isBase,", stops:",d.stops,", strip:",d.strip,", time:",d.time);

		if (settings.viewMode === "cards") {

			console.log("renderer.cards.1, viewMode:",viewMode);

			const card = document.createElement("div");
			card.className = "card";
			if (d.isBase) card.classList.add("base");

			card.innerHTML = `
				<div><b>Step ${d.step}</b></div>
				<div>Stops: ${d.isBase ? "BASE" : d.stops.toFixed(2)}</div>
				<div>Exposure: ${d.time.toFixed(1)}s</div>
			`;

			panel.appendChild(card);
		}

 		if (settings.viewMode === "Table") {

			console.log("renderer.table.1, viewMode:",viewMode);

			const row = document.createElement("tr");
			if (d.isBase) row.classList.add("base-row");

			row.innerHTML = `
				<td>${d.step}</td>
				<td>${d.isBase ? "BASE" : d.stops.toFixed(2)}</td>
				<td>${d.strip.toFixed(1)}</td>
				<td>${d.time.toFixed(1)}</td>
			`;

			tbody.appendChild(row);
		}

		console.log("renderer.62, viewMode:",viewMode,", step:",d.step,", isBase:",d.isBase,", stops:",d.stops,", strip:",d.strip,", time:",d.time);

	});

	document.getElementById("panel").style.display =
		settings.viewMode === "cards" ? "grid" : "none";

	document.getElementById("tableContainer").style.display =
		settings.viewMode === "table" ? "block" : "none";
}