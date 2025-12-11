function Square({ value }) {
  return <button className="square">{value}</button>;
}

export default function Grid() {
  return (
    <>
      <div className="board-row">
        <Square value="0,2" />
        <Square value="1,2" />
        <Square value="2,2" />
      </div>
      <div className="board-row">
        <Square value="0,1" />
        <Square value="1,1" />
        <Square value="2,1" />
      </div>
      <div className="board-row">
        <Square value="0,0" />
        <Square value="1,0" />
        <Square value="2,0" />
      </div>
    </>
  );
}
