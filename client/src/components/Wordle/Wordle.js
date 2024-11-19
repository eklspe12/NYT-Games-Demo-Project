import React from 'react';
import ReturnHomeButton from '../ReturnHomeButton';
import WordleBoard from './WordleBoard';
const Wordle = ({ user }) => {
	return (
		<div>
			<ReturnHomeButton />
			<WordleBoard user={user} />
		</div>
	);
};

export default Wordle;

//wordle function
//should generate 6 X 5 boxes
//  input field should always be highest empty row
//  on submit
//      check each letter against letters of word
//          if correct letter and place tile = green
//          if correct letter and wrong place tile = yellow
//          if wrong letter tile = gray
//      check results
// if all correct end game and congratulate player
// else continue
