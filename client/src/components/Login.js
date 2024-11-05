import React, { useState } from 'react';
import { Text, Box, Input, Button } from '@chakra-ui/react';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		console.log(username, password);
	};
	return (
		<Box>
			<Text>Login</Text>
			<Input
				placeholder={'Username'}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<Input
				placeholder={'Password'}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button onClick={handleLogin}>Login</Button>
		</Box>
	);
};

export default Login;
