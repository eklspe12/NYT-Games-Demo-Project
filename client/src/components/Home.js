import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = ({ setLoggingOut }) => {
	const handleLogout = async () => {
		setLoggingOut(true);
	};
	// this is a weird format that may need to be fixed, logout message component might need to move

	return (
		<div>
			<Button as={Link} to="/wordle">
				Play Wordle
			</Button>
			<Button as={Link} to="/spelling-bee">
				Play Spelling Bee
			</Button>
			<Button as={Link} to="/stats">
				View Stats
			</Button>
			<Button onClick={handleLogout}>Logout</Button>
		</div>
	);
};

export default Home;
