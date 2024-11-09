import React, { useState } from 'react';
import { Text, Box, Input, Button } from '@chakra-ui/react';

const Login = ({ setLoggedIn }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [toggleLogin, setToggleLogin] = useState(true);
	const [newUsername, setNewUsername] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);
	const handleLogin = () => {
		console.log(username, password);
		if (username !== '' && password !== '') {
			setLoggedIn(true);
		}
	};

	const handleToggle = () => {
		console.log(toggleLogin);
		setToggleLogin(!toggleLogin);
	};

	const handleAccountCreation = () => {
		console.log(newUsername, newPassword, confirmPassword);
		if (
			newUsername !== '' &&
			newPassword !== '' &&
			newPassword === confirmPassword
		) {
			setMessage('Account created succesfully');
		} else {
		}
	};
	return (
		<Box>
			{toggleLogin ? (
				<Box width={300}>
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
					<Button onClick={handleToggle}>Create An Account</Button>
				</Box>
			) : (
				<Box width={300}>
					<Text>Create An Account</Text>
					<Input
						placeholder={'Create Username'}
						onChange={(e) => setNewUsername(e.target.value)}
					/>
					<Input
						placeholder={'Create Password'}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<Input
						placeholder={'Confirm Password'}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<Button onClick={handleAccountCreation}>Create Account</Button>
					<Button onClick={handleToggle}>Go Back</Button>
					{message !== null ? <Text>{message}</Text> : null}
				</Box>
			)}
		</Box>
	);
};

export default Login;
