import React from 'react';

const ScoreDisplay = ({ score }) => {
	return (
		<div className="score-container">
			<h1 className="score-title">Current Score</h1>
			<h1 className="score-number">{score}</h1>
		</div>
	);
};

export default ScoreDisplay;
