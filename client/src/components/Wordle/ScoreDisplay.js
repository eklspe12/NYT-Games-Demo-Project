import React from 'react';

const ScoreDisplay = ({ score }) => {
	return (
		<div>
			<h1>Your Score</h1>
			<h1>{score}</h1>
		</div>
	);
};

export default ScoreDisplay;
