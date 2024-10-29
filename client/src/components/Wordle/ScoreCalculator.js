export function scoreCalculator(guesses, wrongLetters, streak) {
	let score = 5100 - guesses * 500 - wrongLetters * 100;
	let streakBonus = streak > 1 ? 500 * (streak - 1) : 0;
	console.log(`Streak bonus: ${streakBonus}`);
	return score + streakBonus;
}
