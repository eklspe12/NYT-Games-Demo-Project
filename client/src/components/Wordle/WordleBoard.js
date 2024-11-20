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
const WordleBoard = ({ user }) => {
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
	const [highScore, setHighScore] = useState(user.streakle_high_score);
	const [highStreak, setHighStreak] = useState(user.streakle_high_streak);
	useEffect(() => {
		const newAnswer = randomWord(wordArray);
		setAnswer(newAnswer);
		console.log(newAnswer);
	}, []);

	const updateUserScoreAndStreak = () => {
		fetch(`http://localhost:5001/user/${user.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ score: score, streak: streak }),
		})
			.then((r) => {
				if (!r.ok) {
					return r.json().then((data) => {
						throw new Error(data.error || 'Failed to update high score.');
					});
				}
				return r.json();
			})
			.then((data) => {
				console.log('Score updated successfully:', data);
			})
			.catch((error) => {
				console.error('Error updating score:', error.message);
				setMessage('Failed to update score. Please try again.');
			});
		if (score > user.streakle_high_score) {
			setHighScore(score);
		}
		if (streak > user.streakle_high_streak) {
			setHighStreak(streak);
		}
	};

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
						updateUserScoreAndStreak();
						//call function to send patch request for score if score > user.score
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
			<Box>{highScore}</Box>
			<Box>{highStreak}</Box>
		</Box>
	);
};

export default WordleBoard;
