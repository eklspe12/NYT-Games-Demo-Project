import React from 'react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div>
			<Button as={Link} to="/wordle">
				Play Wordle
			</Button>
			<Button as={Link} to="/spelling-bee">
				{' '}
				Play Spelling Bee
			</Button>
			<Button as={Link} to="/stats">
				View Stats
			</Button>
		</div>
	);
};

export default Home;
