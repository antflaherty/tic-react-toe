import { useState } from "react";

function Square({ onClick, value }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default function Grid() {
  const [xIsNext, setXIsNext] = useState(true);
  const [boardState, setBoardState] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const winner = calculateWinner(boardState);

  function handleSquareClick(row, column) {
    if (winner || boardState[row][column]) {
      return;
    }

    const newBoardState = boardState.map((row) => row.slice());
    newBoardState[row][column] = xIsNext ? "X" : "O";
    setBoardState(newBoardState);
    setXIsNext(!xIsNext);
  }

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const content = boardState.map((row, rowIndex) => {
    const squares = row.map((value, columnIndex) => (
      <Square
        value={value}
        onClick={() => handleSquareClick(rowIndex, columnIndex)}
      />
    ));
    return <div className="board-row">{squares}</div>;
  });

  return (
    <>
      <div className="status">{status}</div>
      {content}
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
