const countAnswerLetters = (answer) => {
	const answerCount = {};
	const sortedAnswer = answer.sort();
	for (const letter of sortedAnswer) {
		if (answerCount[letter]) {
			answerCount[letter]++;
		}
		answerCount[answer] = 1;
	}
	return answerCount;
};

//create state to hold guess letters
const [correctGuessCount, setCorrectGuessCount] = useState({});

const correctGuessLetters = (guess) => {
	const tempGuessCount = {};
	const sortedGuess = guess.sort();
	for (const letter of sortedGuess) {
		if (answer.includes(letter)) {
			if (tempGuessCount[letter]) {
				tempGuessCount[letter]++;
			}
			tempGuessCount[letter] = 1;
		}
	}
	setCorrectGuessCount(tempGuessCount);
};

let tileClass = 'wordle-tile';
if (letter && index < answer.length) {
	const isCorrect = letter === answer[index];
	const isPresent = !isCorrect && answer.includes(letter);
	if (isCorrect) {
		tileClass = 'correct';
	}
	if (isPresent) {
		if (correctGuessCount[letter] >= answerCount[letter]) {
			tileClass = 'wrong';
		} else {
			tileClass = 'present';
		}
	} else {
		tileClass = 'wrong';
	}
}

//will need to reset setGuessCount after everySubmit

//if letter is in word but wrong place
//      compare if correct place is = to answerLetters
//          < = yellow
//          = black
//      return class
