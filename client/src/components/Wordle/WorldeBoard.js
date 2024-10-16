import React, { useState } from 'react';
import WordleRow from './WordleRow';
import { Box, Text } from '@chakra-ui/react';
import InputRow from './InputRow';
import Submit from './Submit';
const WordleBoard = () => {
	const [rows, setRows] = useState(Array(6).fill(Array(5).fill('')));
	const [currentGuess, setCurrentGuess] = useState('');
	const [currentRow, setCurrentRow] = useState(0);
	const answer = 'fruit';
	const [message, setMessage] = useState('');

	const handleSubmit = () => {
		if (currentGuess.length === 5) {
			const newRow = currentGuess.split('');
			const updatedRows = [...rows];
			updatedRows[currentRow] = newRow;

			setRows(updatedRows);
			setCurrentRow(currentRow + 1);
			if (currentGuess === answer) {
				setMessage('Good Job!');
			} else {
				setMessage('');
			}
			setCurrentGuess('');
		} else {
			setMessage('Must be 5 letters');
		}
	};

	return (
		<Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
			{rows.map((letters, index) => (
				<Box key={index}>
					{index === currentRow ? (
						<InputRow currentGuess={currentGuess} />
					) : (
						<WordleRow letters={letters} answer={answer} />
					)}
				</Box>
			))}
			{message && <Text mt={4}>{message}</Text>}
			<Submit
				handleSubmit={handleSubmit}
				currentGuess={currentGuess}
				setCurrentGuess={setCurrentGuess}
			/>
		</Box>
	);
};

export default WordleBoard;

// top unused row should be input field that only accepts letters with each letter getting a tile (no more than 5 letters)
//      on submit should verify exactly 5 letters long
//      (ignore - will add later) on submit should verify word is real
//      if real word, must check each tiles letter
//          Maybe by iterating through each input tile vs the index of each char of the string which is the answer word
//      each letter in the correct place will change that tiles class to correct
//      each letter that is in the word but in the wrong place will change it's tile to class misplaced
//      each letter not in the word will change it's tile to class wrong
//      if all tiles classes are correct display winning message
//      otherwise next row becomes new input row
