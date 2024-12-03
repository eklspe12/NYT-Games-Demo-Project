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
	const [newHighScore, setNewHighScore] = useState(false);
	const [newHighStreak, setNewHighStreak] = useState(false);
	const [answerCount, setAnswerCount] = useState({});

	const countAnswerLetters = (answer) => {
		const tempAnswerCount = {};
		const sortedAnswer = answer.split('').sort().join('');
		for (const letter of sortedAnswer) {
			if (tempAnswerCount[letter]) {
				tempAnswerCount[letter]++;
			}
			tempAnswerCount[letter] = 1;
		}
		setAnswerCount(tempAnswerCount);
	};

	useEffect(() => {
		const newAnswer = randomWord(wordArray);
		setAnswer(newAnswer);
		countAnswerLetters(newAnswer);
		console.log(newAnswer);
	}, []);

	useEffect(() => {
		console.log('Updated answerCount:', answerCount);
	}, [answerCount]);

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
			setNewHighScore(true);
		}
		if (streak > user.streakle_high_streak) {
			setHighStreak(streak);
			setNewHighStreak(true);
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
		console.log('resetBoard');
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
		setNewHighScore(false);
		setNewHighStreak(false);
		console.log('reset game');
	};

	const handleSubmit = () => {
		console.log('handle submit');
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
				let newWrongLetters = [...wrongLetters];

				for (let i = 0; i < currentGuess.length; i++) {
					if (
						!answer.includes(currentGuess[i]) &&
						!newWrongLetters.includes(currentGuess[i].toUpperCase())
					) {
						newWrongLetters.push(currentGuess[i].toUpperCase());
					}
				}

				setWrongLetters(newWrongLetters);
				if (guessNum >= 6) {
					if (streak !== 0) {
						updateUserScoreAndStreak();
						setGameStatus('win');
						console.log('Game status should be win');
					} else {
						setGameStatus('lose');
						console.log('game status should be lose');
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
					newHighScore={newHighScore}
					newHighStreak={newHighStreak}
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
