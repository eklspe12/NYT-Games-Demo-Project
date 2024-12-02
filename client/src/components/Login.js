import React, { useState } from 'react';
import { Text, Box, Input, Button } from '@chakra-ui/react';
import { Filter } from 'bad-words';

const Login = ({ setLoggedIn, user, setUser }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [toggleLogin, setToggleLogin] = useState(true);
	const [newUsername, setNewUsername] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const filter = new Filter();

	const resetFields = () => {
		setConfirmPassword('');
		setPassword('');
		setNewPassword('');
		setUsername('');
		setNewUsername('');
	};

	const handleLogin = async () => {
		if (!username || !password) {
			setMessage('Please fill out username and password fields.');
			return;
		}
		try {
			const response = await fetch('http://localhost:5001/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});
			if (response.ok) {
				const userData = await response.json();
				setUser(userData);
				setLoggedIn(true);
				setMessage('Login successful!');
			} else if (response.status === 401) {
				setMessage('Invalid login information.');
			} else if (response.status === 404) {
				setMessage('Username not found');
			} else {
				setMessage('An error occurred. Please try again.');
			}
		} catch (err) {
			setMessage('Network error. Please try again later.');
		}
	};

	const handleToggle = () => {
		setToggleLogin(!toggleLogin);
		resetFields();
		setMessage(null);
	};

	const validateUsername = (input) => {
		if (!/^[a-zA-Z0-9_]{3,15}$/.test(input)) {
			return 'Username must be between 3-15 characters and contain only letters and numbers.';
		}
		if (filter.isProfane(input)) {
			return 'Inappropriate word detected. Please chose a different username.';
		}
		return null;
	};

	const validatePassword = (input) => {
		if (input.length < 8 || input.length > 19) {
			return 'Password must be between 8-20 characters long.';
		}
		if (!/[A-Z]/.test(input)) {
			return 'Password must contain at least one uppercase letter.';
		}
		if (!/[a-z]/.test(input)) {
			return 'Password must contain at least one lowercase letter.';
		}
		if (!/[0-9]/.test(input)) {
			return 'Password must contain at least one number.';
		}
		if (!/[!@#$%^&*(),.?":{}|<>]/.test(input)) {
			return 'Password must contain at least one special character.';
		}
		return null;
	};
	const handleAccountCreation = async (e) => {
		e.preventDefault();
		const validationError = validateUsername(newUsername);
		if (validationError) {
			setMessage(validationError);
			return;
		}
		const passwordValidationError = validatePassword(newPassword);
		if (passwordValidationError) {
			setMessage(passwordValidationError);
			return;
		}
		if (!newUsername || !newPassword || !confirmPassword) {
			setMessage('Please fill out all fields.');
			return;
		}

		if (newPassword !== confirmPassword) {
			setMessage('Passwords must match.');
			return;
		}
		try {
			const response = await fetch('http://localhost:5001/signup', {
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
				resetFields();
				setToggleLogin(true);
			} else if (response.status === 422) {
				setMessage('Username is already taken.');
			} else {
				setMessage('An error occurred. Please try again.');
			}
		} catch (err) {
			setMessage('Network error. Please try again later');
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
						value={username}
					/>
					<Input
						placeholder={'Password'}
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button onClick={handleLogin}>Login</Button>
					<Button onClick={handleToggle}>Create An Account</Button>
					{message !== null ? <Text>{message}</Text> : null}
				</Box>
			) : (
				<Box width={300}>
					<Text>Create An Account</Text>
					<Input
						placeholder={'Create Username'}
						value={newUsername}
						onChange={(e) => setNewUsername(e.target.value)}
					/>
					<Input
						placeholder={'Create Password'}
						onChange={(e) => setNewPassword(e.target.value)}
						type="password"
						value={newPassword}
					/>
					<Input
						placeholder={'Confirm Password'}
						onChange={(e) => setConfirmPassword(e.target.value)}
						type="password"
						value={confirmPassword}
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
