import React from 'react';
import { Button, Box } from '@chakra-ui/react';

import WordleBoard from './WordleBoard';
const Wordle = ({ user, setLoggingOut }) => {
	const handleLogout = async () => {
		setLoggingOut(true);
	};
	return (
		<div>
			<Button onClick={handleLogout}>Logout</Button>
			<Box mx="auto" display={'flex'} justifyContent={'center'}>
				<WordleBoard user={user} />
			</Box>
		</div>
	);
};

export default Wordle;
