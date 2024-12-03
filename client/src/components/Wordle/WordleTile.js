import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import '../../index.css';

const WordleTile = ({
	letter = '',
	index,
	answer = '',
	answerCount,
	correctGuessCount,
}) => {
	const [tileClass, setTileClass] = useState('wordle-tile');
	const [locked, setLocked] = useState(false);
	const tileAnswerCount = answerCount;
	const tileCorrectGuessCount = correctGuessCount;

	useEffect(() => {
		if (!locked && letter && index < answer.length) {
			let newTileClass = 'wrong';
			const isCorrect = letter === answer[index];
			const isPresent = !isCorrect && answer.includes(letter);

			if (isCorrect) {
				newTileClass = 'correct';
			} else if (isPresent) {
				if (tileCorrectGuessCount[letter] <= tileAnswerCount[letter]) {
					newTileClass = 'present';
				}
			}
			setTileClass(newTileClass);
			setLocked(true);
		}
	}, [locked, letter, index, answer, tileCorrectGuessCount, tileAnswerCount]);

	return <Box className={tileClass}>{letter.toUpperCase()}</Box>;
};

export default WordleTile;
