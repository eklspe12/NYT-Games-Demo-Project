const countAnswerLetters = (answer) => {
	const answerCount = {};
	const sortedAnswer = answer.split('').sort().join('');
	for (const letter of sortedAnswer) {
		if (answerCount[letter]) {
			answerCount[letter]++;
		}
		answerCount[letter] = 1;
	}
	return answerCount;
};

//create state to hold guess letters
const [correctGuessCount, setCorrectGuessCount] = useState({});

const correctGuessLetters = (guess) => {
	const tempGuessCount = {};
	const sortedGuess = guess.split('').sort().join('');
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

// Have correctPlaceGuessCount and answerCount
//      correctPlaceGuessCount shouldn't be able to exceed answerCount
//      need variable to count letters that are in the word but the incorrect spot
//          for example an answer of 'hello' with a guess of 'beeps' should return an answer count of 1 for e, a correctPlaceGuessCount of 1 for e, and variable of present letters of 2 for e
//      need someway to compare those variables when passing to wordleTiles so if answerCount for a letter and correctPlaceGuessCount are the same, it doesn't matter if the guess had more instances of that letter, and the tiles of that letter not in the correct place will be given a permanent class of wrong rather than present
