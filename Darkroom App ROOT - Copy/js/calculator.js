export function generateSteps(settings) {
	const { baseTime, increment, steps } = settings;

	const half = Math.floor(steps / 2);
	let results = [];
	let stepCount = 0;

	for (let i = half; i >= -half; i--) {
		stepCount++;

		const stops = i * increment;
		const time = baseTime * Math.pow(2, stops);
		const isBase = Math.abs(time - baseTime) < 0.001;

		console.log("calculator.generateSteps.1, step:",stepCount," stops:",stops,", time:",time,", isBase:",isBase);

		results.push({
			step: stepCount,
			stops,
			time,
			strip: time,
			isBase
		});
	}

	return results;
}