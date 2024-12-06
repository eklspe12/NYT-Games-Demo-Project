import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import Wordle from './Wordle/Wordle';
import Login from './Login';
import LogoutMessage from './Wordle/LogoutMessgae';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [loggingOut, setLoggingOut] = useState(false);
	const [user, setUser] = useState(null);

	return (
		<ChakraProvider>
			<Box
				style={{
					background: 'linear-gradient(120deg, #ffffff, #d7f5f7)',
					height: '100vh',
					overflow: 'hidden',
				}}
			>
				{loggingOut ? (
					<LogoutMessage
						setLoggingOut={setLoggingOut}
						setLoggedIn={setLoggedIn}
						setUser={setUser}
					/>
				) : null}
				{!loggedIn ? (
					<Box className="login-container">
						<Login setLoggedIn={setLoggedIn} setUser={setUser} />
					</Box>
				) : (
					<Router>
						<Box>
							<Routes>
								<Route
									path="/wordle"
									element={<Wordle user={user} setLoggingOut={setLoggingOut} />}
								/>
								<Route path="*" element={<Navigate to="/wordle" />} />
							</Routes>
						</Box>
					</Router>
				)}
			</Box>
		</ChakraProvider>
	);
}

export default App;
