const Game = ({ status }: { status: number }) => (
  <div>
    <div style={{ backgroundColor: "blue", height: 100 - status + "vh" }}></div>
    <div style={{ backgroundColor: "green", height: status + "vh" }}></div>
  </div>
);

export default Game;
