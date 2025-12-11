import { useState } from "react";

function Square({ onClick, value }) {
  return (
    <button className="square" onClick={onClick}>
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
    const newBoardState = boardState.map((row) => row.slice());
    newBoardState[row][column] = "X";
    setBoardState(newBoardState);
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

  return <>{content}</>;
}
