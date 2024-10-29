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

const EndGameLoseMessage = ({ resetGame }) => {
	const [isOpen, setIsOpen] = useState(true);

	const closeModal = () => {
		setIsOpen(false);
	};
	return (
		<Modal isOpen={isOpen} onClose={closeModal}>
			<ModalOverlay />
			<ModalContent>
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
					{/* maybe add a logout button here, or a return home/viewstats */}
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default EndGameLoseMessage;
