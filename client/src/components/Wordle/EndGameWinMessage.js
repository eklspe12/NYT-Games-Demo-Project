import React, { useState } from 'react';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	ModalFooter,
	ModalHeader,
} from '@chakra-ui/react';

const EndGameWinMessage = ({
	score,
	streak,
	resetGame,
	newHighScore,
	newHighStreak,
	answer,
}) => {
	const [isOpen, setIsOpen] = useState(true);
	const answerDisplay = answer.toUpperCase();

	const closeModal = () => {
		setIsOpen(false);
	};
	return (
		<Modal isOpen={isOpen} onClose={closeModal}>
			<ModalOverlay />
			<ModalContent>
				{newHighScore && newHighStreak ? (
					<ModalHeader>New High Score and Streak!</ModalHeader>
				) : newHighScore && !newHighStreak ? (
					<ModalHeader>New High Score!</ModalHeader>
				) : newHighStreak && !newHighScore ? (
					<ModalHeader>New High Streak!</ModalHeader>
				) : (
					<ModalHeader>Congrats!</ModalHeader>
				)}
				<ModalHeader>{answerDisplay} was the final word.</ModalHeader>
				<ModalBody>
					You scored {score} points and guessed {streak} words correct!
				</ModalBody>
				<ModalBody>See if you can beat that score next time!</ModalBody>
				<ModalFooter>
					<Button
						onClick={() => {
							closeModal();
							resetGame();
						}}
					>
						Play again
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default EndGameWinMessage;
