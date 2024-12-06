import React, { useState } from 'react';
import {
	Text,
	Box,
	Input,
	Button,
	FormControl,
	FormLabel,
} from '@chakra-ui/react';
import { Filter } from 'bad-words';

const Login = ({ setLoggedIn, setUser }) => {
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

	const inputStyle = {
		border: 'none',
		borderBottom: '2px solid #adadad',
		borderRadius: '0px',
		_focus: {
			borderBottom: '2px solid #2691d9',
			borderRadius: '0px',
			boxShadow: 'none',
			outline: 'none',
		},
		_placeholder: {
			color: 'transparent',
		},
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
		<Box className="login-form">
			{toggleLogin ? (
				<Box>
					<Text className="login-title">Login</Text>
					<FormControl>
						<FormLabel className="login-label">Username</FormLabel>
						<Input
							className="login-input"
							onChange={(e) => setUsername(e.target.value)}
							value={username}
							sx={inputStyle}
						/>
					</FormControl>
					<FormControl>
						<FormLabel className="login-label">Password</FormLabel>
						<Input
							className="login-input"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							sx={inputStyle}
						/>
					</FormControl>
					<Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
						<Button onClick={handleLogin} className="login-create-button">
							Login
						</Button>
						<Text className="signup-text">
							Need an account?{' '}
							<span className="signup-link" onClick={handleToggle}>
								Signup
							</span>
						</Text>
						<Text textAlign={'center'}>
							*For demo purposes, feel free to use login 'username' and
							'Password1!'
						</Text>
					</Box>

					{message !== null ? (
						<Text className="login-message">{message}</Text>
					) : null}
				</Box>
			) : (
				<Box>
					<Text className="login-title">Create An Account</Text>
					<FormControl>
						<FormLabel className="login-label">Create Username</FormLabel>
						<Input
							className="login-input"
							value={newUsername}
							onChange={(e) => setNewUsername(e.target.value)}
							sx={inputStyle}
						/>
					</FormControl>
					<FormControl>
						<FormLabel className="login-label">Create Password</FormLabel>
						<Input
							className="login-input"
							onChange={(e) => setNewPassword(e.target.value)}
							type="password"
							value={newPassword}
							sx={inputStyle}
						/>
					</FormControl>
					<FormControl>
						<FormLabel className="login-label">Confirm Password</FormLabel>
						<Input
							className="login-input"
							onChange={(e) => setConfirmPassword(e.target.value)}
							type="password"
							value={confirmPassword}
							sx={inputStyle}
						/>
					</FormControl>
					<Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
						<Button
							onClick={handleAccountCreation}
							className="login-create-button"
						>
							Create Account
						</Button>
						<Text className="signup-text">
							Have an account?{' '}
							<span className="signup-link" onClick={handleToggle}>
								Login
							</span>
						</Text>
					</Box>
					{message !== null ? (
						<Text className="login-message" color={'red'}>
							{message}
						</Text>
					) : null}
				</Box>
			)}
		</Box>
	);
};

export default Login;
