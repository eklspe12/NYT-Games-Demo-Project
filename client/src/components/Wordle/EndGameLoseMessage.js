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

const EndGameLoseMessage = ({ resetGame, answer }) => {
	const [isOpen, setIsOpen] = useState(true);
	const displayAnswer = answer.toUpperCase();

	const closeModal = () => {
		setIsOpen(false);
	};
	return (
		<Modal isOpen={isOpen} onClose={closeModal}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{displayAnswer} was the word.</ModalHeader>
				<ModalHeader>Tough Luck...</ModalHeader>
				<ModalBody>
					Ouch! Looks like you weren't able to get the word this time. But don't
					worry, unlike the real Wordle, you don't have to wait until tomorrow
					to play again!
				</ModalBody>
				<ModalBody>Why not try again now!?</ModalBody>
				<ModalFooter>
					<Button
						onClick={() => {
							closeModal();
							resetGame();
						}}
					>
						Play Again
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default EndGameLoseMessage;
