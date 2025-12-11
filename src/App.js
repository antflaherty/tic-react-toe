import { useState } from "react";

function Square({ handleClick, value }) {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

export default function Grid() {
  const [boardState, setBoardState] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  function handleSquareClick(row, column) {
    const newBoardState = structuredClone(boardState);
    newBoardState[row][column] = "X";
    setBoardState(newBoardState);
  }

  return (
    <>
      <div className="board-row">
        <Square
          handleClick={() => handleSquareClick(0, 0)}
          value={boardState[0][0]}
        />
        <Square
          handleClick={() => handleSquareClick(0, 1)}
          value={boardState[0][1]}
        />
        <Square
          handleClick={() => handleSquareClick(0, 2)}
          value={boardState[0][2]}
        />
      </div>
      <div className="board-row">
        <Square
          handleClick={() => handleSquareClick(1, 0)}
          value={boardState[1][0]}
        />
        <Square
          handleClick={() => handleSquareClick(1, 1)}
          value={boardState[1][1]}
        />
        <Square
          handleClick={() => handleSquareClick(1, 2)}
          value={boardState[1][2]}
        />
      </div>
      <div className="board-row">
        <Square
          handleClick={() => handleSquareClick(2, 0)}
          value={boardState[2][0]}
        />
        <Square
          handleClick={() => handleSquareClick(2, 1)}
          value={boardState[2][1]}
        />
        <Square
          handleClick={() => handleSquareClick(2, 2)}
          value={boardState[2][2]}
        />
      </div>
    </>
  );
}
