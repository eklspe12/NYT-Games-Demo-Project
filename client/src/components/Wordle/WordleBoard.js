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
import HighScoreDisplay from './HighScoreDisplay';
import HighStreakDisplay from './HighStreakDisplay';
import { wordArray, randomWord } from './WordList';
import StreakDisplay from './StreakDisplay';
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
	const [correctGuessCount, setCorrectGuessCount] = useState({});
	const [presentGuessCount, setPresentGuessCount] = useState({});
	const [resetTiles, setResetTiles] = useState(false);

	const countAnswerLetters = (answer) => {
		const tempAnswerCount = {};
		for (const letter of answer) {
			if (tempAnswerCount[letter]) {
				tempAnswerCount[letter]++;
			} else {
				tempAnswerCount[letter] = 1;
			}
		}
		setAnswerCount(tempAnswerCount);
	};

	const countPresentLetters = (guess) => {
		const tempPresentCount = {};
		for (const letter of guess) {
			if (answer.includes(letter)) {
				if (tempPresentCount[letter]) {
					tempPresentCount[letter]++;
				} else {
					tempPresentCount[letter] = 1;
				}
			}
		}
		setPresentGuessCount(tempPresentCount);
	};

	const correctGuessLetters = (guess) => {
		const tempGuessCountCorrectPlace = {};

		for (let i = 0; i < guess.length; i++) {
			const letter = guess[i];
			if (letter === answer[i]) {
				if (tempGuessCountCorrectPlace[letter]) {
					tempGuessCountCorrectPlace[letter]++;
				} else {
					tempGuessCountCorrectPlace[letter] = 1;
				}
			}
		}

		setCorrectGuessCount(tempGuessCountCorrectPlace);
	};

	useEffect(() => {
		const newAnswer = randomWord(wordArray);
		setAnswer(newAnswer);
		countAnswerLetters(newAnswer);
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
		setGameStatus('ongoing');
		countAnswerLetters(newAnswer);
		setResetTiles(true);
		setTimeout(() => setResetTiles(false), 0);
	};
	const resetGame = () => {
		resetBoard();
		setScore(0);
		setStreak(0);
		setMessage('');
		setNewHighScore(false);
		setNewHighStreak(false);
	};

	const handleSubmit = () => {
		if (currentGuess.length === 5) {
			correctGuessLetters(currentGuess);
			countPresentLetters(currentGuess);
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
					answer={answer}
					resetGame={resetGame}
					newHighScore={newHighScore}
					newHighStreak={newHighStreak}
				/>
			) : gameStatus === 'lose' ? (
				<EndGameLoseMessage resetGame={resetGame} answer={answer} />
			) : (
				''
			)}

			<WelcomeMessage />
			<Box display={'flex'} flexDirection={'row'}>
				<Box>
					<ScoreDisplay score={score} />
					<StreakDisplay streak={streak} />
				</Box>
				<Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
					{rows.map((letters, index) => (
						<Box key={index}>
							{index === currentRow ? (
								<InputRow currentGuess={currentGuess} />
							) : (
								<WordleRow
									letters={letters}
									answer={answer}
									answerCount={answerCount}
									correctGuessCount={correctGuessCount}
									presentGuessCount={presentGuessCount}
									resetTiles={resetTiles}
								/>
							)}
						</Box>
					))}
					<Box className="message">
						{message && <Text mt={4}>{message}</Text>}
					</Box>

					<Submit
						handleSubmit={handleSubmit}
						currentGuess={currentGuess}
						setCurrentGuess={setCurrentGuess}
					/>
					<Box>
						<WrongLetterDisplay wrongLetters={wrongLetters} />
					</Box>
				</Box>
				<Box>
					<Box>
						<HighScoreDisplay highScore={highScore} />
					</Box>
					<Box>
						<HighStreakDisplay highStreak={highStreak} />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default WordleBoard;
