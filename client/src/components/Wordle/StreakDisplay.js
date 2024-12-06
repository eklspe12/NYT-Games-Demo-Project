import React from 'react';

const StreakDisplay = ({ streak }) => {
	return (
		<div className="streak-container">
			<h1 className="streak-title">Current Streak</h1>
			<h1 className="streak-number">{streak}</h1>
		</div>
	);
};

export default StreakDisplay;
