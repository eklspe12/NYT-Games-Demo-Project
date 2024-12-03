import React from 'react';
import WordleTile from './WordleTile';
import { Box } from '@chakra-ui/react';

const WordleRow = ({
	key,
	letters,
	answer,
	answerCount,
	correctGuessCount,
	presentGuessCount,
	resetTiles,
}) => {
	return (
		<Box display={'flex'}>
			{' '}
			{letters.map((letter, index) => (
				<WordleTile
					key={index}
					letter={letter}
					answer={answer}
					index={index}
					answerCount={answerCount}
					correctGuessCount={correctGuessCount}
					presentGuessCount={presentGuessCount}
					resetTiles={resetTiles}
				/>
				//likely need to pass answercount and guess count arrays into function
			))}
		</Box>
	);
};

export default WordleRow;
