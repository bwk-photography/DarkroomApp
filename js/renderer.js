export function render(results, settings) {
	// console.log(results)
	// console.log(settings)

	const panel = document.getElementById("panel");
	const tbody = document.getElementById("tableBody");
	const tableHead = document.getElementById("tableHead");
	const viewMode = "table";

	panel.innerHTML = "";
	tbody.innerHTML = "";


 	if (settings.viewMode === "table") {
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

		if (settings.viewMode === "cards") {

			// console.log("renderer.cards.1, viewMode:",viewMode);

			const card = document.createElement("div");
			card.className = "card";
			if (d.isBase) card.classList.add("base");

            card.innerHTML = `
                <b>Step ${d.stepCount}</b><br>
                Stops: ${d.isBase ? "BASE" : d.stops.toFixed(2)}<br>
                Exposure: ${d.time.toFixed(1)}s<br>
                Strip Time: +${d.stripIncrement.toFixed(1)}s<br>
            `;

			panel.appendChild(card);
		}

 		if (settings.viewMode === "table") {

			const row = document.createElement("tr");
			if (d.isBase) row.classList.add("base-row");


            row.innerHTML = `
                <td>${d.stepCount}</td>
                <td>${d.isBase ? "BASE" : d.stops.toFixed(2)}</td>
                <td>+${d.stripIncrement.toFixed(1)}</td>
                <td>${d.time.toFixed(1)}</td>
            `;

			tbody.appendChild(row);
		}

	});

	document.getElementById("panel").style.display =
		settings.viewMode === "cards" ? "grid" : "none";

	document.getElementById("tableContainer").style.display =
		settings.viewMode === "table" ? "block" : "none";
}