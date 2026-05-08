export function generateSteps(settings) {

	const { baseTime, increment, steps } = settings;

	const half = Math.floor(steps / 2);
	let exposures = [];
	let lastData = [];
	let stepCount = 0;

	// STEP 1: generate exposure list
	for (let i = half; i >= -half; i--) {
		const stops = i * increment;
		const time = baseTime * Math.pow(2, stops);
		exposures.push({ stepCount: stepCount + 1, stops, time });
		stepCount++;
	}

	// STEP 2: sort ascending by exposure time
	const sorted = [...exposures].sort((a, b) => a.time - b.time);

	let prev = 0;
	sorted.forEach(d => {
		d.stripStart = prev;
		d.stripEnd = d.time;
		d.stripIncrement = d.time - prev;
		prev = d.time;
	});

	// STEP 3 + 4: restore original order and flag base
	exposures.forEach(d => {
		const match = sorted.find(s => s.stepCount === d.stepCount);
		d.stripIncrement = match.stripIncrement;
		d.stripStart = match.stripStart;
		d.stripEnd = match.stripEnd;
		d.isBase = Math.abs(d.time - baseTime) < 0.001;
		lastData.push(d);
	});

	return lastData;
}
