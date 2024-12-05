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

const LogoutMessage = ({ setLoggingOut, setLoggedIn, user, setUser }) => {
	const [isOpen, setIsOpen] = useState(true);

	const handleLogoutAndClearSession = async () => {
		try {
			const response = await fetch('http://localhost:5001/clear_session', {
				method: 'DELETE',
			});
			if (response.ok) {
				setLoggedIn(false);
				setLoggingOut(false);
				closeModal();
				setUser(null);
			}
		} catch (err) {
			console.error('Error logging out:', err);
		}
	};

	const closeModal = () => {
		setIsOpen(false);
		setLoggingOut(false);
	};

	return (
		<Modal isOpen={isOpen} onClose={closeModal}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Log Out!</ModalHeader>
				<ModalBody>Are you sure you would like to logout?</ModalBody>

				<ModalFooter>
					<Button onClick={closeModal}>No</Button>
					<Button onClick={handleLogoutAndClearSession}>Yes</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default LogoutMessage;
