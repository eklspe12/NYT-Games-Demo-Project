import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Button, Box, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import SpellingBee from './SpellingBee/SpellingBee';
import Home from './Home';
import Wordle from './Wordle/Wordle';
import ViewStats from './ViewStats';
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
							{/* <Route
								path="/"
								element={<Home setLoggingOut={setLoggingOut} />}
							/> */}
							<Route
								path="/wordle"
								element={<Wordle user={user} setLoggingOut={setLoggingOut} />}
							/>
							{/* <Route path="/spelling-bee" element={<SpellingBee />} />
							<Route path="/stats" element={<ViewStats />} /> */}
						</Routes>
					</Box>
				</Router>
			)}
		</ChakraProvider>
	);
}

export default App;
