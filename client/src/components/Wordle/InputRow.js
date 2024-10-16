import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import WordleTile from './WordleTile';
const InputRow = ({ currentGuess }) => {
	return (
		<Box display={'flex'} alignItems={'center'}>
			<Box display={'flex'}>
				{Array.from({ length: 5 }, (_, index) => (
					<WordleTile key={index} letter={currentGuess[index] || ''} />
				))}
			</Box>
		</Box>
	);
};

export default InputRow;
