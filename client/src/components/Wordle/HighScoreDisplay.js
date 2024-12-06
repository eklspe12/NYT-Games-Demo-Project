import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const HighScoreDisplay = ({ highScore }) => {
	return (
		<Box className="high-score-container">
			<Text className="high-score-title">Your High Score</Text>
			<Text className="high-score-number">{highScore}</Text>
		</Box>
	);
};

export default HighScoreDisplay;
