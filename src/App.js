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
    const newBoardState = structuredClone(boardState);
    newBoardState[row][column] = "X";
    setBoardState(newBoardState);
  }

  let content = boardState.map((row, rowIndex) => {
    let squares = row.map((value, columnIndex) => {
      return (
        <Square
          value={value}
          onClick={() => handleSquareClick(rowIndex, columnIndex)}
        />
      );
    });
    return <div className="board-row">{squares}</div>;
  });

  return <>{content}</>;
}
