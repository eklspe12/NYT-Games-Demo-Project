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

const WelcomeMessage = () => {
	const [isOpen, setIsOpen] = useState(true);

	const closeModal = () => {
		setIsOpen(false);
	};
	return (
		<Modal isOpen={isOpen} onClose={closeModal}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Welcome!</ModalHeader>
				<ModalBody>
					As an avid fan of the NYT game Wordle, I decided to practice coding
					skills by creating my own version of Wordle. Streakle!
				</ModalBody>
				<ModalBody>
					In this version of Wordle, the game will continue to generate new
					words with each correct answer until you're unable to guess the word
					in 6 attempts. In addition, a score is generated based on the amount
					of letters and guesses you use, and a streak bonus based on how many
					words in a row you've guessed!
				</ModalBody>
				<ModalFooter>
					<Button onClick={closeModal}>Start Playing</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default WelcomeMessage;
