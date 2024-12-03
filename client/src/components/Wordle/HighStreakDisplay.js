import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const HighStreakDisplay = ({ highStreak }) => {
	return (
		<Box className="high-streak-container">
			<Text className="high-streak-title">Your High Streak</Text>
			<Text className="high-streak-number">{highStreak}</Text>
		</Box>
	);
};

export default HighStreakDisplay;
