import React from 'react';

const WrongLetterDisplay = ({ wrongLetters }) => {
	return (
		<div>
			<h1>Used Letters</h1>
			<h2>
				<div>
					{wrongLetters.sort().map((letter, index) => (
						<span key={index}>{letter} </span> // Display each letter inside a <span>
					))}
				</div>
			</h2>
		</div>
	);
};

export default WrongLetterDisplay;
