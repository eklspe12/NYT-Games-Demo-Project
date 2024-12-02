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
const [guessCount, setGuessCount] = useState({});

const countGuessLetters = (letter) => {
	const tempGuessCount = {};

	if (tempGuessCount[letter]) {
		tempGuessCount[letter]++;
	}
	tempGuessCount[letter] = 1;

	setGuessCount(tempGuessCount);
};

//will need to reset setGuessCount after everySubmit

//if letter is in word but wrong place
//      compare if correct place is = to answerLetters
//          < = yellow
//          = black
//      return class
