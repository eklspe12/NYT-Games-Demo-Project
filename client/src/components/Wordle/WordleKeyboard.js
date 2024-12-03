import React, { useEffect, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { Box } from '@chakra-ui/react';
import '../../index.css';

const WordleKeyboard = ({
	correctGuessCount,
	presentGuessCount,
	wrongLetters,
}) => {
	const [buttonState, setButtonState] = useState({});

	useEffect(() => {
		const newButtonState = {};
		const allLetters = 'qwertyuiopasdfghjklzxcvbnm'.split('');

		allLetters.forEach((letter) => {
			if (wrongLetters.includes(letter)) {
				newButtonState[letter] = 'wrong-button';
			} else if (correctGuessCount.hasOwnProperty(letter)) {
				newButtonState[letter] = 'correct-button';
			} else if (
				presentGuessCount.hasOwnProperty(letter) &&
				!correctGuessCount.hasOwnProperty(letter)
			) {
				newButtonState[letter] = 'present-button';
			} else {
				newButtonState[letter] = '';
			}
		});
		console.log('Button state', newButtonState);
		setButtonState(newButtonState);
	}, [wrongLetters, correctGuessCount, presentGuessCount]);

	const onKeyPress = (button) => {
		console.log('button pressed', button);
	};
	return (
		<Box className={'keyboard-container'}>
			<Keyboard
				className={'keyboard'}
				buttonTheme={[
					{
						className: 'all-buttons',
						buttons:
							'Q W E R T Y U I O P A S D F G H J K L Z X C V B N M q w e r t y u i o p a s d f g h j k l z x c v b n m',
					},
				]}
				layout={{
					default: [
						'q w e r t y u i o p',
						'a s d f g h j k l',
						'z x c v b n m',
					],
				}}
				onKeyPress={onKeyPress}
				buttonClass={(button) => buttonState[button]}
			/>
		</Box>
	);
};

export default WordleKeyboard;
