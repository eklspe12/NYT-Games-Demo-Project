import React from 'react';
import { Button } from '@chakra-ui/react';

import WordleBoard from './WordleBoard';
const Wordle = ({ user, setLoggingOut }) => {
	const handleLogout = async () => {
		setLoggingOut(true);
	};
	return (
		<div>
			<Button onClick={handleLogout}>Logout</Button>
			<WordleBoard user={user} />
		</div>
	);
};

export default Wordle;
