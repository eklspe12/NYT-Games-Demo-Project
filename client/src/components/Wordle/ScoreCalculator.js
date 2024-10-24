export function scoreCalculator(guesses, wrongLetters, streak) {
	let score = 5100 - guesses * 500 - wrongLetters * 100;
	let streakBonus = 500 * (streak - 1);
	return score + streakBonus;
}
