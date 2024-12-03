import React from 'react';
import { Box } from '@chakra-ui/react';
import '../../index.css';

const WordleTile = ({ letter = '', index, answer = '' }) => {
	let tileClass = 'wordle-tile';
	//replace this if statement with new statement in practice file
	if (letter && index < answer.length) {
		const isCorrect = letter === answer[index];
		const isPresent = !isCorrect && answer.includes(letter);
		tileClass = isCorrect ? 'correct' : isPresent ? 'present' : 'wrong';
	}
	return <Box className={tileClass}>{letter.toUpperCase()}</Box>;
};

export default WordleTile;
