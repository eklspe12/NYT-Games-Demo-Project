import React from 'react';
import { Input, Box, Button } from '@chakra-ui/react';

const Submit = ({ handleSubmit, currentGuess, setCurrentGuess }) => {
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault(); // Prevent default form submission
			handleSubmit(); // Call handleSubmit directly
		}
	};
	const handleChange = (event) => {
		let input = event.target.value.toLowerCase();
		if (/^[a-zA-Z]*$/.test(input) && input.length <= 5) {
			setCurrentGuess(input);
		}
	};
	return (
		<Box>
			<Input
				value={currentGuess}
				onChange={(e) => {
					handleChange(e);
				}}
				// onChange={(e) => {
				// 	const value = e.target.value.toLowerCase();
				// 	if (value.length <= 5) setCurrentGuess(value);
				// }}
				onKeyDown={handleKeyDown}
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
