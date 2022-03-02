import UserLeaderBoard from "./userleaderboard";

export default function LeaderBoard() {
  const users = [
    { name: "DatBen", balance: 1000 },
    { name: "DatBen2", balance: 10000 },
  ];
  return (
    <div className="LeaderBoard">
      <p>LeaderBoard :</p>
      {users.map(({ name, balance }, i) => (
        <UserLeaderBoard key={i} rank={i} name={name} balance={balance} />
      ))}
    </div>
  );
}
