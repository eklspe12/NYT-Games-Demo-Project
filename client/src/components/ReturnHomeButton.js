import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ReturnHomeButton = () => {
	const navigate = useNavigate();
	return (
		<div>
			<Button onClick={() => navigate('/')}>Return Home</Button>
		</div>
	);
};

export default ReturnHomeButton;
