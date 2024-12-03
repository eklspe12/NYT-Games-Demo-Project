import React from 'react';

const WrongLetterDisplay = ({ wrongLetters }) => {
	return (
		<div className="wrong-letter-container">
			<h1 className="wrong-letter-title">Incorrect Letters</h1>
			<h2>
				<div className="wrong-letters">
					{wrongLetters.sort().map((letter, index) => (
						<span key={index}>{letter} </span>
					))}
				</div>
			</h2>
		</div>
	);
};

export default WrongLetterDisplay;
