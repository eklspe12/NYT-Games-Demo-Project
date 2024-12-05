import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
			{loggingOut ? (
				<LogoutMessage
					setLoggingOut={setLoggingOut}
					setLoggedIn={setLoggedIn}
					user={user}
					setUser={setUser}
				/>
			) : null}
			{!loggedIn ? (
				<Box className="login-container">
					<Login setLoggedIn={setLoggedIn} user={user} setUser={setUser} />
				</Box>
			) : (
				<Router>
					<Box>
						<Routes>
							<Route
								path="/wordle"
								element={<Wordle user={user} setLoggingOut={setLoggingOut} />}
							/>
						</Routes>
					</Box>
				</Router>
			)}
		</ChakraProvider>
	);
}

export default App;
