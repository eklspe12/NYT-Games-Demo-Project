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
	const [error, setError] = useState(null);
	// const handleLogin = () => {
	// 	console.log(username, password);
	// 	if (username !== '' && password !== '') {
	// 		setLoggedIn(true);
	// 	}
	// };

	const handleLogin = async () => {
		if (!username || !password) {
			setError('Please fill out username and password fields.');
		}
		try {
			const response = await fetch('/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});
			if (response.ok) {
				const user = await response.json();
				setLoggedIn(true);
				setMessage('Login successful!');
				setError(null);
			} else if (response.status === 401) {
				setError('Invalid login information.');
			} else if (response.status === 404) {
				setError('Username not found');
			} else {
				setError('An error occurred. Please try again.');
			}
		} catch (err) {
			setError('Network error. Please try again later.');
		}
	};

	const handleToggle = () => {
		setToggleLogin(!toggleLogin);
		setMessage(null);
		setError(null);
	};

	const handleAccountCreation = async () => {
		if (!newUsername || !newPassword || !confirmPassword) {
			setError('Please fill out all fields.');
			return;
		}
		if (newPassword !== confirmPassword) {
			setError('Passwords must match.');
			return;
		}
		try {
			const response = await fetch('/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					newUsername,
					newPassword,
				}),
			});
			if (response.ok) {
				setMessage('Account created successfully!');
				setError(null);
				setNewPassword('');
				setNewUsername('');
				setConfirmPassword('');
				setToggleLogin(true);
			} else if (response.status === 422) {
				setError('Username is already taken.');
			} else {
				setError('An error occurred. Please try again.');
			}
		} catch (err) {
			setError('Network error. Please try again later');
		}
	};

	// const handleAccountCreation = () => {
	// 	console.log(newUsername, newPassword, confirmPassword);
	// 	if (
	// 		newUsername !== '' &&
	// 		newPassword !== '' &&
	// 		newPassword === confirmPassword
	// 	) {
	// 		setMessage('Account created succesfully');
	// 	} else {
	// 	}
	// };
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
						type="password"
					/>
					<Input
						placeholder={'Confirm Password'}
						onChange={(e) => setConfirmPassword(e.target.value)}
						type="password"
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
