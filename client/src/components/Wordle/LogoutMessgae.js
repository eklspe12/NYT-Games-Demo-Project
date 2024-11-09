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

const LogoutMessage = ({ setLoggingOut, setLoggedIn }) => {
	const [isOpen, setIsOpen] = useState(true);

	const closeModal = () => {
		setIsOpen(false);
		setLoggingOut(false);
	};
	const logout = () => {
		setLoggedIn(false);
		setLoggingOut(false);
		closeModal();
	};
	return (
		<Modal isOpen={isOpen} onClose={closeModal}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Log Out!</ModalHeader>
				<ModalBody>Are you sure you would like to logout?</ModalBody>

				<ModalFooter>
					<Button onClick={closeModal}>No</Button>
					<Button onClick={logout}>Yes</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default LogoutMessage;
