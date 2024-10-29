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

const EndGameWinMessage = ({ score, streak, resetGame }) => {
	const [isOpen, setIsOpen] = useState(true);

	const closeModal = () => {
		setIsOpen(false);
	};
	return (
		<Modal isOpen={isOpen} onClose={closeModal}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Congrats!</ModalHeader>
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
