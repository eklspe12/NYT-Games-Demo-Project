# NYT Games Demo

## Introduction

Welcome to Streakle, a Wordle based game I created from the ground up to practice writing algorithms and sorting functions. This game works similarly to NYT's Wordle, only the game will continue to give you words as long as you guess the answer by your 6th guess, calculating a score as you go. Your high score and streak are always connected to your account. This app is limited without a free API to draw words from, so the answers are generated from a hardcoded list, and the user can enter guesses that are not real words. I plan on adding more games in the future so stay tuned!

## Contact Information

### Spencer Eklund - eklund.spencer@outlook.com

# Files

## Client/src

### index.js

This file imports React and Chakra making them available throughout the app, and renders the main App component to the HTML page.

## Client/src/components

### App.js

This is the main file for navigating to different pages of the app, although currently the only page is wordle, more pages are being developed. React useState is used to track the current user, if a user is logged in, and if the user is trying to logout. When the page first loads, the Logins.js component is conditionally rendered based on the loggedIn state which is set default to true. Once the user enters valid login credentials, the user is set and the loggedIn state is changed to true (handled in the logic of the Login.js component), which conditionally renders the rest of the app, which for the time being is the /wordle route.

The LogoutMessage.js component is imported here as well so if the user clicks the logout button on any page it will display a message to confirm by switching the isLoggingOut state to true and conditionally rendering the LogoutMessage.js component. If the user confirms they would like to log out the LougoutMessage.js component will set the user back to null and loggedIn to false, bringing them back to the Login form. If the user selects no it will change isLoggingOut back to false without changing any other states.

### Login.js

This component holds the login form, create account form, and the logic needed to give the forms function. The input fields are controlled with the useState consts username, password, newUsername, newPassword, and confirmPassword.

The function resetFields sets the value of all input fields back to an empty string, while the handleToggle function determines which form is conditionally rendered based on if its value is true or false. Both functions are called when the user clicks the 'signup' or 'login' spans.

validateUsername and validatePassword are both called by the handleAccountCreation function in the account creation process when a user clicks create account. validateUsername first checks that the username is made of 3-15 approved characters, then uses the Filter imported from bad-words to ensure the username does not contain profanity. If either check is failed, the message state is changed to display information to the user that is conditionally rendered based on if message is not null or ''. validatePassword has five separate checks to ensure proper length and that the password contains at least one uppercase letter, lowercase letter, number, and special character. If any check is failed it returns an error to be displayed with the message state. Next the handleAccountCreation function checks that all fields are filled out and that the password matches the confirm password.

If all checks are passed, the client attempts to send a POST request to the server with the newUsername and newPassword variables sent as JSON. If the backend returns no issues the account is created the message state is changed to a success message and resetFields is called and toggleLoggin is set to true, returning the user to the login form. If a 422 response is returned, the user is informed that the username they entered has been taken.

The const input style contains the CSS style applied to all of the input fields on the form.

Each input field tracks usernames and passwords and automatically updates their state on change.

## Client/src/components/Worlde

### EnGameLoseMessage.js

Created with the Modal components of chakra.ui, this component is conditionally rendered if a game ends with a streak of zero, indicating the user guessed no words correct. This message also displays the answer word passed in as a prop. On clicking the play again button the isOpen state changes to false and the modal closes and the game is reset.

### EndGameWinMessgae.js

Created with the Modal components of chakra.ui, this component is conditionally displayed if the user ends a game with a streak of at least 1 by changing the isOpen state to true, and conditionally closed when the user clicks play again, changing the state back to false. This component takes in the score and streak of the game played, the answer, and the states of newHighScore and newHighStreak, which track whether the user beat their previous records. If newHighScore and/or newHighStreak are true, a congratulations message is conditionally rendered with the rest of the message. Included in the message is the user's score, streak, and the answer from the final round.

### HighScoreDisplay.js

This component receives the user's high score as a prop and displays it.

### HighStreakDisplay.js

This component receives the user's high streak as a prop and displays it.

### InputRow.js

Receives the currentGuess from the input field on wordleBoard and separates each letter into a tile by creating an array from the word and passing a key to the tile that matches the index of the letter.

### LogoutMessage.js

Created with the Modal components of chakra.ui, this component is conditionally rendered based on the isLoggingOut state which is set to true when the user clicks the logout button.

handleLogoutAndClearSession sends a DELETE request to the server to clear the session then sets the user to null, loggedIn to false, setLoggingOut to false and calls closeModal. This function is called when the user confirms they want to logout. If the user confirms they do not want to log out, closeModal is called to set isOpen to false and isLoggingOut to false, closing the message.

### ScoreCalculator.js

Holds the function that calculates the user's current score.

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

- countAnswerLetters: Creates an empty object, then iterates through each letter of the answer, adding the letter if it is not in the object or incrementing its value by one if it is. Sets answerCount to tempAnswerCount at end of function.
- countPresentLetters: Creates an empty object, then iterates through each letter of the guess word to see if it is included in the answer word. If the letter is in the answer word, the function then checks if that letter is in the new object, adding it if not, and incrementing its value by one if it is. presentGuessCount is set to the value of the temporary object.
- correctGuessLetters: Creates an empty object, then iterates through each letter of the guess word, comparing it to the letter at the same index of the answer. If it is in the correct place, it then checks to see if the new object contains that letter, incrementing its value by one if true, and adding the letter if not. Sets correctGuessCount to the temporary object.
- useEffect: Retrieves a random word from the words list, then sets the answer to the letter and calls countAnswerLetters on that word.
- updateScoreAndStreak: Sends the game score and streak states to the server after a game. If the server returns confirmation that the user has beaten their high score or streak, the highStreak/highScore states are changed to true.
- resetBoard: Sets most states back to their default, creates a new answer, calls countAnswerLetters, and resets the tiles to be the default class.
- resetGame: Calls resetBoard to set most states back to defualt, then sets any other necessary states back to default to begin a new game.
- handleSubmit: Checks to see if the guess is 5 letters, if not it skips the function and sets the message to 'Guess must be 5 letters'. If a guess is 5 letters, correctGuessCount and countPresentLetters are called, then a new row is created with the letters of the current guess, before adding the new row to the rest of the rows as an unchangeable row. Current row is then incremented by 1, changing the input row. If the current guess was the answer, a congratulations message is rendered, the streak increments by 1, and a score for the round is calculated. The calculated score is then added to the total score and the board is reset. If the guess is not the answer, the guessNum state increments 1 and the wrong letters are added to the display. If the guess is not the answer and it is the 6th guess, the function checks if the user has a streak of 0, changing the gameStatus to lose and displaying the EndGameLoseMessage, otherwise if the streak is not 0, the gameStatus is set to win, a score is calculated, and the EndGameWinStatus is displayed. After any result of a submission the currentGuess is set back to ''.

### WordleRow.js

Receives the guess word letters, the answer word, the variables to count present letters, correct letters, and the answer's letters, and the state variable resetTiles which sets the tiles back to their default class.
Maps each letter to create a unique tile, passing down all the vairables it received.

### WorldeTile.js

Receives the guess word letters, the answer word, the variables to count present letters, correct letters, and the answer's letters, and the state variable resetTiles which sets the tiles back to their default class. Default value for letter and answer are set to '' to prevent errors on edge cases.

The tileClass state variable changes based on the values of the tileAnswerCount, tileCorrectGuessCount, and tilePresentGuessCount variables, and is what causes the color change of the tile to indicate if the letter is found in the word and in the correct position. After a submission, the locked state is changed to true, which prevents the class of the tile from being changed until the end of the round.
The tileAnsweCount, tileCorrectGuessCount, and tilePresentGuess count are all equal to the related state variable passed in, but this prevents them from being changed dynamically.

The first useEffect hook is dependent on the resetTiles state being true. This hook sets the tile class back to default and sets locked back to false, allowing the tile to have a new class assigned again.

The second useEffect hook is updated when an answer is submitted and the letter, tileCorrectGuessCount, tileAnswerCount, and tilePresentCount states are changed. This hook first checks if a tile is already locked, preventing locked tiles from changing, then applies a class to the tile based on several conditions. The class is set to 'wrong' by default, then the variable isCorrectis made to hold a boolean value of if the letter is deeply equal to the letter at the same index of the answer, and a second variable isPresent is made to hold a boolean value of if isCorrect is false and the letter is found anywhere in the answer. If the isCorrect is true, the tile class is set to 'correct'. If isCorrect is false, the function then checks if isPresent is true; if so the correctGuessCount for the letter is compared to the answer count for the letter. If the correctGuessCount is less than the answerCount, the tile class is set to present, otherwise it is set to wrong. This is to prevent a tile from showing as present when the letter has already been correctly placed the maximum amount of times, which would indicate to the user that the letter should be placed more than it is found in the answer. After the conditionals, the tileClass is set and the tile is locked.

### WordList.js

This file stores the 500 possible words for the game. In a perfect version I would have access to an API, but for this demo the words are all hardcoded. The used words array holds any answer words to prevent them being repeated. The newAnswer variable calls the randomWord function, which works by calling Math.floor and Math.random with a value of the arrays length to get an index. This index is then used to pull a word from the array at that location which is converted to lowercase and returned.
The correctAnswer function is called when the user guessed the answer, and it takes in a string then sets the value of wordArray to be equal to itself with the previous answer filtered out. Then a randomWord is called on our updated array to return a new answer.

### WrongLetterDisplay.js

This component receives the state variable wrongLetters which tracks all letters the user guessed that are not found in the word. These letters are then sorted and mapped to be displayed to the user.

## Server

### app.db

This is our SQL database to store user login information and the high scores assocaited with their accounts.

### app.py

Contains many Flask imports used to run the database as well as the routes present in the app. Also imports models and variables from config.py to prevent circular imports.

random_key generates a random 24 character key to be used as a secret_key.

BASE_DIR and DATABASE sets up the path to our python app and attempt to reach our database at BASE_DIR. If BASE_DIR is unavailable the Flask app.db is used instead.

app = Flask() specifies where the frontend files are being served from in the client folder.

migrate is a variable that uses the import Migrate to allow Flask to work with alembic.

db.init_app(app) initializes the SQLAlchemy database for Flask.

api = Api(app) allows the use of Flask restful to create routes.

#### Routes

@app.route('/') sets the home/default route to '/'

def index(id=0): return render template("index.html") determines the file rendered by flask when the '/' route is accessed.

ClearSession: deletes the current session and returns a 204 status code to the frontend when complete.

Signup: Executes the post function with a username and password received from the client. If both the username and password are present, then function then checks if there is already a user in the database with the same username; returning an error message if so. If the username is unique, a new User instance is created with the username as is and the password hashed. Finally the session is set to the new user.

Login: Executes the post function with a username and password received from the client, then filters the User class of the database to find if a User matches. If no user is found, a 404 status is returned. If a username and password are not both received a 400 code is returned. If a username exists and a password is present the password is authenticated to ensure it matches the user and the session is set to the user if so. If username and password do no match a 401 status is returned.

UserResource: Executes a patch request if the high_score or high_streak received are higher than the user's current values. First filters User instances to find current user, returning a 404 if User not found, then checks that high_score and high_streak have values, returning 400 if not. high_score_updated and high_streak_updated are set to false by default, then the value of each is compared to the user's current value to see if the new value is greater. If the new value is greater, the value associated with the user is updated and the high_score/streak_updated variables are set to true. If either variable is true the change is committed. A response message is created based on which variables were true.

### models.py

Several SQLAlchemy functions are imported to be used in the models as well as functions from config.py to prevent circular imports.

The User model creates User instances with an id, username, hashed password, streakle_high_streak, and streakle_high_score. The password_hash setter uses bcrypt to generate an encrypted password. Authenticate is a function called during the login procedure to compare the received password with the encrypted password. validates_username ensures a username is present and is at least 5 characters long. validates_password ensures there is a password that is at least 8 characters long.

### config.py

App configurations are found here as well as Flask and SQL imports to prevent circular imports.
