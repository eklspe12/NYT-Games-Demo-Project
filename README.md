# NYT Games Demo

## Introduction

Actually write something about why I created this and what it shows off

# Files

## Client/src

### index.js

This file imports React and Chakra making them available throughout the app, and renders the main App component to the HTML page.

## Cient/src/components

### App.js

This is the main files for navigating to different pages of the app, although currently the only page is wordle, more pages are being developed. React useState is used to track the the current user, if a user is logged in, and if the user is trying to logout. When the page first loads, the Logins.js component is conditionally rendered based on the loggedIn state which is set defaultly to true. Once the user enters valid login credentials, the user is set and the loggedIn state is changed to true (handled in the logic of the Login.js component), which conditionally renders the rest of the app, which for the time being is the /wordle route.

The LogoutMessage.js component is imported here as well so if the user clicks the logout button on any page it will display a message to confirm by switinf the isLoggingOut state to true and conditionally rendering the LogoutMessage.js component. If the user confirms they would like to log out the LougoutMessage.js component will set the user back to null and loggedIn to false, bringing them back to the Login form. If the user selects no it will change isLoggingOut back to false without changing any other states.

### Login.js

This component holds the login form, create account form, and the logic needed to give the forms function. The input fields are controlled with the useState consts username, password, newUsername, newPassword, and confirmPassword.

The function resetFields sets the value of all input fields back to an empty string, while the handleToggle function determines which form is conditionally rendered based on if its value is true or false. Both functions are called when the user clicks the 'signup' or 'login' spans.

validateUsername and validatePassword are both called by the handleAccountCreation function in the account creation process when a user clicks create account. validateUsername first checks that the username is made of 3-15 approved characters, then uses the Filter imported from bad-words to ensure the username does not contain profanity. If either check is failed, the message state is changed to display information to the user that is conditionally rendered based on if message is not null or ''. validatePassword has five separate checks to ensure proper length and that the password contains at least one uppercase letter, lowercase letter, number, and special character. If any check is failed it returns an error to be displayed with the message state. Next the handleAccountCreation function checks that all fields are filled out and that the password matches the confirm password.

If all checks are passed, the client attempts to send a POST request to the server with the newUsername and newPassword variables sent as JSON. If the backend returns no issues the account is created the message state is change to a success message and resetFields is called and toggleLoggin is set to true, returning the user to the login form. If a 422 response is returned, the user is informed that the username they entered has been taken.

The const input style contains the CSS style applied to all of the input fields on the form.

Each input field tracks usernames and passwords and automatically updates their state on change.

## Client/src/components/Worlde

### EnGameLoseMessage.js

Created with the Modal components of chakra.ui, this component is conditionally rendered if a game ends with a streak of zero, indicating the user guessed no words correct. This message also displays the answer word passed in as a prop. On clicking the play again button the isOpen state changes to false and the modal closes and the game is reset.

### EndGameWinMessgae.js

Created with the Modal components of chakra.ui, this component is conditionally displayed if the user ends a game with a streak of at least 1 by changing the isOpen state to true, and conditionally closed when the user clicks play again, changing the state back to false. This component takes in the score and streak of the game played, the answer, and the states of newHighScore and newHighStreak, which track whether the user beat their previous records. If newHighScore and/or newHighStreak are true, a congratulations message is conditionally rendered with the rest of the message. Included in the message is the users score, streak, and the answer from the final round.

### HighScoreDisplay.js

This component receives the users high score as a prop and displays it.

### HighStreakDisplay.js

This component receives the users high streak as a prop and displays it.

### InputRow.js

Receives the currentGuess from the input field on wordleBoard and separates each letter into a tile by creating an array from the word and passing a key to the tile that matches the index of the letter.

### LogoutMessage.js

Created with the Modal components of chakra.ui, this component is conditionally rendered based on the isLoggingOut state which is set to true when the user clicks the logout button.

handleLogoutAndClearSession sends a DELETE request to the server to clear the session then sets the user to null, loggedIn to false, setLoggingOut to false and calls closeModal. This function is called when the user confirms they want to logout. If the user confirms they do not want to log out, closeModal is called to set isOpen to false and isLoggingOut to false, closing the message.

### ScoreCalculator.js

Holds the function that calculates the users current score.

### ScoreDisplay.js

This component receives and displays the current game score.

### StreakDisplay.js

This component receives and displays the current streak score.

### Submit.js

This component is created with the Input and Button components from charka.ui, and it allows the user to type and submit their answers.

handleKeyDown was added so the user could use the enter key to submit answers.

handleChange takes whatever is entered in the input field, ensures that it is 5 or less letters, then sets currentGuess to the input if it is.

The submit button calls handleSubmit defined in WorldeBoard.js.

### WelcomeMessage.js

Created with the Modal components of chakra.ui, this component opens automatically when the user first logs in and describes how the game works. Clicking 'Start Playing' changes isOpen to false and closes the Modal.

### Wordle.js

Contains the wordle route, wordleBoard, and logout button. Currently the only purpose is to pass the user data to the WordleBoard, but more will be added in the future.

### WordleBoard.js

This component contains most states, functions, and components necessary for the game to function.

#### States

- rows:
- currentGuess: Tracks the current word the user is submitting.
- guessNum: Tracks how many answers the user has submitted per round.
- currentRow: Determines which row is the input row.
- answer: Stores the answer for the round.
- message: Contains feedback for the user to be rendered.
- wrongLetters: Store letters in user guesses that are not in the word.
- streak: Tracks how many consecutive words the user has guessed correct.
- score: Stores the calculated user score for the current game.
- gameStatus: Used to conditionally render game message components.
- highScore: Stores high score associated with user.
- highStreak: Stores high score associated with user.
- answerCount: Creates an object that stores instances of each letter in the answer word.
- correctGuessCount: Creates an object for each guess that stores instances of letters in the correct place compared to the answer word.
- presentGuessCount: Creates an object for each guess that stores instances of letters found in the answer but in the wrong index.
- resetTiles: Used to clear tiles after a round or game.

#### Functions

- countAnswerLetters: Creates an empty object, then iterates through each letter of the answer, adding the letter if it is not in the object or incrementing its value by one of it is. Sets answerCount to tempAnswerCount at end of function.
- countPresentLetters: Creates an empty object, then iterates through each letter of the guess word to see if it is included in the answer word. If the letter is in the answer word, the function then checks if that letter is in the new object, adding it if not, and incrementing its value by one if it is. presentGuessCount is set to the value of the temporary object.
- correctGuessLetters: Creates an empty object, then iterates through each letter of the guess word, comparing it to the letter at the same index of the answer. If it is in the correct place, it then checks to see if the new object contains that letter, incrementing its value by one if true, and adding the letter if not. Sets correctGuessCount to the temporary object.
- useEffect: Retrieves a random words form the words list, then sets the answer to the letter and calls countAnswerLetters on that word.
- updateScoreAndStreak: Sends the game score and streak states to the server after a game. If the server returns confirmation that the user has beaten their high score or streak, the highStreak/highScore states are changed to true.
- resetBoard: Sets most states back to their default, creates a new answer, calls countAnswerLetters, and resets the tiles to be the default class.
- resetGame: Calls resetBoard to set most states back to defualt, then sets any other necessary states back to default to begin a new game.
- handleSubmit: Checks to see if the guess is 5 letters, if not it skips the function and sets the message to 'Guess must be 5 letters'. If a guess is 5 letters, correctGuessCount and countPresentLetters are called, then a new row is created with the letters of the current guess, before adding the new row to the rest of the rows as an unchangeable row. Current row is then incremented by 1, changing the input row. If the current guess was the answer, a congratulations message is rendered, the streak increments by 1, and a score for the round is calculated. The calculated score is then added to the total score and the board is reset. If the guess is not the answer, the guessNum state increments 1 and the wrong letters are added to the display. If the guess is not the answer and it is the 6th guess, the function checks if the user has a streak of 0, changing the gameStatus to lose and displaying the EndGameLoseMessage, otherwise if the streak is not 0, the gameStatus is set to win, a score is calculated, and the EndGameWinStatus is displayed. After any result of a submission the currentGuess is set back to ''.
