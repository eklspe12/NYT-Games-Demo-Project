function scoreCalculator(guesses, letters, streak) {
	let score = 5600 - guesses * 500 - letters * 100;
	let streakBonus = 500 * (streak - 1);
	return score + streakBonus;
}
