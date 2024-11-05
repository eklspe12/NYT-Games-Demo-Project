import React, { useState, useEffect } from 'react';
import WordleRow from './WordleRow';
import { Box, Text } from '@chakra-ui/react';
import InputRow from './InputRow';
import Submit from './Submit';
import { scoreCalculator } from './ScoreCalculator';
import ScoreDisplay from './ScoreDisplay';
import WrongLetterDisplay from './WrongLetterDisplay';
import WelcomeMessage from './WelcomeMessage';
import EndGameLoseMessage from './EndGameLoseMessage';
import EndGameWinMessage from './EndGameWinMessage';
import {
	wordArray,
	usedWords,
	newAnswer,
	correctAnswer,
	randomWord,
} from './WordList';
const WordleBoard = () => {
	const [rows, setRows] = useState(Array(6).fill(Array(5).fill('')));
	const [currentGuess, setCurrentGuess] = useState('');
	const [guessNum, setGuessNum] = useState(1);
	const [currentRow, setCurrentRow] = useState(0);
	const [answer, setAnswer] = useState('');
	const [message, setMessage] = useState('');
	const [wrongLetters, setWrongLetters] = useState([]);
	const [streak, setStreak] = useState(0);
	const [score, setScore] = useState(0);
	const [gameStatus, setGameStatus] = useState('ongoing');
	useEffect(() => {
		const newAnswer = randomWord(wordArray);
		setAnswer(newAnswer);
		console.log(newAnswer);
	}, []);

	const resetBoard = () => {
		setRows(Array(6).fill(Array(5).fill('')));
		setCurrentRow(0);
		setCurrentGuess('');
		setGuessNum(1);
		setWrongLetters([]);
		const newAnswer = randomWord(wordArray);
		setAnswer(newAnswer);
		setMessage(streak > 0 ? `Streak Bonus +${streak * 500}!` : 'New Word!');
		console.log(newAnswer);
		setGameStatus('ongoing');
	};
	const resetGame = () => {
		setRows(Array(6).fill(Array(5).fill('')));
		setCurrentRow(0);
		setScore(0);
		setStreak(0);
		setCurrentGuess('');
		setGuessNum(1);
		setWrongLetters([]);
		const newAnswer = randomWord(wordArray);
		setAnswer(newAnswer);
		setMessage('');
		console.log(newAnswer);
		setGameStatus('ongoing');
	};

	const handleSubmit = () => {
		// if (gameStatus !== 'ongoing') {
		// 	return;
		// }
		if (currentGuess.length === 5) {
			const newRow = currentGuess.split('');
			const updatedRows = [...rows];
			updatedRows[currentRow] = newRow;

			setRows(updatedRows);
			setCurrentRow(currentRow + 1);
			if (currentGuess === answer) {
				setMessage('Good Job!');
				const newStreak = streak + 1;
				setStreak(newStreak);
				let wrongLetterCount = wrongLetters.length;
				let calculatedScore = scoreCalculator(
					guessNum,
					wrongLetterCount,
					newStreak
				);
				setScore(score + calculatedScore);
				setGuessNum(1);
				setTimeout(() => {
					resetBoard();
				}, 1500);

				console.log(guessNum);
			} else {
				setMessage('');
				setGuessNum(guessNum + 1);
				let newWrongLetters = [...wrongLetters]; // Create a copy of the current wrongLetters array

				for (let i = 0; i < currentGuess.length; i++) {
					if (
						!answer.includes(currentGuess[i]) &&
						!newWrongLetters.includes(currentGuess[i].toUpperCase())
					) {
						newWrongLetters.push(currentGuess[i].toUpperCase()); // Add only letters that aren't in the answer
					}
				}

				setWrongLetters(newWrongLetters);
				if (guessNum >= 6) {
					if (streak !== 0) {
						setGameStatus('win');
					} else {
						setGameStatus('lose');
					}
				}

				console.log(`Guess number: ${guessNum}`);
				console.log(`Used letters: ${wrongLetters}`);
			}
			setCurrentGuess('');
		} else {
			setMessage('Must be 5 letters');
		}
	};

	return (
		<Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
			{gameStatus === 'win' ? (
				<EndGameWinMessage
					score={score}
					streak={streak}
					resetGame={resetGame}
				/>
			) : gameStatus === 'lose' ? (
				<EndGameLoseMessage resetGame={resetGame} />
			) : (
				''
			)}
			<WelcomeMessage />
			<Box>
				<WrongLetterDisplay wrongLetters={wrongLetters} />
			</Box>
			<Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
				{rows.map((letters, index) => (
					<Box key={index}>
						{index === currentRow ? (
							<InputRow currentGuess={currentGuess} />
						) : (
							<WordleRow letters={letters} answer={answer} />
						)}
					</Box>
				))}
				{message && <Text mt={4}>{message}</Text>}
				<Submit
					handleSubmit={handleSubmit}
					currentGuess={currentGuess}
					setCurrentGuess={setCurrentGuess}
				/>
			</Box>
			<Box>
				<ScoreDisplay score={score} />
			</Box>
		</Box>
	);
};

export default WordleBoard;

// top unused row should be input field that only accepts letters with each letter getting a tile (no more than 5 letters)
//      on submit should verify exactly 5 letters long
//      (ignore - will add later) on submit should verify word is real
//      if real word, must check each tiles letter
//          Maybe by iterating through each input tile vs the index of each char of the string which is the answer word
//      each letter in the correct place will change that tiles class to correct
//      each letter that is in the word but in the wrong place will change it's tile to class misplaced
//      each letter not in the word will change it's tile to class wrong
//      if all tiles classes are correct display winning message
//      otherwise next row becomes new input row

//for unused letters
//when answer is checked, if a letter is not in word and not in the unused letters array
//		set unused letter array state to be the current array plus the new letter
