import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Button, Box, Heading } from '@chakra-ui/react';
import SpellingBee from './SpellingBee/SpellingBee';
import Home from './Home';
import Wordle from './Wordle/Wordle';
import ViewStats from './ViewStats';

function App() {
	return (
		<ChakraProvider>
			<Router>
				<Box>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/wordle" element={<Wordle />} />
						<Route path="/spelling-bee" element={<SpellingBee />} />
						<Route path="/stats" element={<ViewStats />} />
					</Routes>
				</Box>
			</Router>
		</ChakraProvider>
	);
}

export default App;
