import React from 'react';
import { Input, Box, Button } from '@chakra-ui/react';

const Submit = ({ handleSubmit, currentGuess, setCurrentGuess }) => {
	return (
		<Box>
			<Input
				value={currentGuess}
				onChange={(e) => {
					const value = e.target.value.toLowerCase();
					if (value.length <= 5) setCurrentGuess(value);
				}}
				onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
				maxLength={5}
				placeholder="Enter your guess"
				width="100px"
				ml={2}
			/>
			<Button onClick={handleSubmit}>Submit</Button>
		</Box>
	);
};

export default Submit;
