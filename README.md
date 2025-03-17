# Super Tic-Tac-Toe

Super Tic-Tac-Toe is an advanced version of the classic Tic-Tac-Toe game. This project includes both the game logic implemented in JavaScript and an Express.js server that saves game data to a PostgreSQL database. The game uses EJS templating for rendering the game history.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Game Rules](#game-rules)
- [Database Schema](#database-schema)
- [Endpoints](#endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- Play Super Tic-Tac-Toe in your browser.
- Save game data (winner, X moves, Y moves) to a PostgreSQL database.
- View game history with EJS templating.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/mihir2004/superTicTacToe.git
    cd superTicTacToe
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up your PostgreSQL database:**

    Create a PostgreSQL database and update the database configuration in the Express server.

4. **Create the database table:**

    ```sql
    CREATE TABLE game_data (
        id SERIAL PRIMARY KEY,
        winner VARCHAR(10) NOT NULL,
        x_moves INTEGER[] NOT NULL,
        y_moves INTEGER[] NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

## Usage

1. **Start the Express server:**

    ```bash
    npm start
    ```

2. **Open your browser and navigate to:**

    ```
    http://localhost:3000
    ```

3. **Play the game and view the game history at:**

    ```
    http://localhost:3000/gameHistory
    ```

## Game Rules

- The game board consists of 9 mini Tic-Tac-Toe boards arranged in a 3x3 grid.
- Players take turns playing on the mini boards.
- The first player to win three mini boards in a row (horizontally, vertically, or diagonally) wins the game.
- The location of the next move is determined by the position of the previous move.

## Database Schema

The `game_data` table stores the game results:

```sql
CREATE TABLE game_data (
    id SERIAL PRIMARY KEY,
    winner VARCHAR(10) NOT NULL,
    x_moves INTEGER[] NOT NULL,
    y_moves INTEGER[] NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Endpoints

`GET/:` Displays the game board.
`POST/move:` Submits a move.
`GET/gameHistory:` Displays the game history.

## Technologies Used
1. JavaScript
2. Express.js
3. EJS
4. PostgreSQL
5. HTML
6. CSS

## Contributing
1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature-branch).
5. Open a pull request.

## License
This structure ensures that the endpoints, technologies used, and contributing guidelines are placed in their respective sections, making the `README.md` clear and well-organized.


