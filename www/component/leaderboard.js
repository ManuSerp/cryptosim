import UserLeaderBoard from "./userleaderboard";

export default function LeaderBoard() {
  const users = [
    { name: "DatBen", balance: 1000 },
    { name: "DatBen2", balance: 10000 },
  ];
  return (
    <div className="LeaderBoard">
      {users.map(({ name, balance }, i) => (
        <UserLeaderBoard key={i} name={name} balance={balance} />
      ))}
    </div>
  );
}
