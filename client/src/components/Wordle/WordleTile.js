import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import '../../index.css';

const WordleTile = ({
	letter = '',
	index,
	answer = '',
	answerCount,
	correctGuessCount,
	presentGuessCount,
	resetTiles,
}) => {
	const [tileClass, setTileClass] = useState('wordle-tile');
	const [locked, setLocked] = useState(false);
	const tileAnswerCount = answerCount;
	const tileCorrectGuessCount = correctGuessCount;
	const tilePresentGuessCount = presentGuessCount;

	useEffect(() => {
		if (resetTiles) {
			setTileClass('wordle-tile');
			setLocked(false);
		}
	}, [resetTiles]);

	useEffect(() => {
		if (!locked && letter && index < answer.length) {
			let newTileClass = 'wrong';
			const isCorrect = letter === answer[index];
			const isPresent = !isCorrect && answer.includes(letter);

			if (isCorrect) {
				newTileClass = 'correct';
			} else if (isPresent) {
				if ((correctGuessCount[letter] || 0) < (answerCount[letter] || 0)) {
					newTileClass = 'present';
				} else {
					newTileClass = 'wrong';
				}
			}

			setTileClass(newTileClass);
			setLocked(true);
		}
	}, [
		locked,
		letter,
		index,
		answer,
		tileCorrectGuessCount,
		tileAnswerCount,
		tilePresentGuessCount,
		correctGuessCount,
		answerCount,
		presentGuessCount,
	]);

	return <Box className={tileClass}>{letter.toUpperCase()}</Box>;
};

export default WordleTile;
