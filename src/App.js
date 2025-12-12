import { useState } from "react";

function Square({ onClick, value }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Grid({
  gameState: { boardState, player: nextPlayer },
  onStateChange,
}) {
  const winner = calculateWinner(boardState);

  function handleSquareClick(row, column) {
    if (winner || boardState[row][column]) {
      return;
    }

    const newBoardState = boardState.map((row) => row.slice());
    newBoardState[row][column] = nextPlayer;
    onStateChange(newBoardState);
  }

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + nextPlayer;
  }

  const content = boardState.map((row, rowIndex) => {
    const squares = row.map((value, columnIndex) => (
      <Square
        key={columnIndex}
        value={value}
        onClick={() => handleSquareClick(rowIndex, columnIndex)}
      />
    ));
    return (
      <div key={rowIndex} className="board-row">
        {squares}
      </div>
    );
  });

  return (
    <>
      <div className="status">{status}</div>
      {content}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([
    {
      boardState: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      player: "X",
    },
  ]);

  function handleBoardStateChange(newBoardState) {
    setHistory([
      ...history,
      {
        boardState: newBoardState,
        player: history.at(-1).player === "X" ? "O" : "X",
      },
    ]);
  }

  function restoreState(move) {
    setHistory(history.slice(0, move + 1));
  }

  const currentGameState = history.at(-1);

  return (
    <>
      <Grid
        gameState={currentGameState}
        onStateChange={handleBoardStateChange}
      />
      <ol>
        {history.map((_boardState, move) => {
          return (
            <li key={move}>
              <button onClick={() => restoreState(move)}>
                Got to move {move}
              </button>
            </li>
          );
        })}
      </ol>
    </>
  );
}

function calculateWinner(board) {
  const winningStates = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  for (let i = 0; i < winningStates.length; i++) {
    const [a, b, c] = winningStates[i];
    if (
      board[a[0]][a[1]] &&
      board[a[0]][a[1]] === board[b[0]][b[1]] &&
      board[a[0]][a[1]] === board[c[0]][c[1]]
    ) {
      return board[a[0]][a[1]];
    }
  }
  return null;
}
