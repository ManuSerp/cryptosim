export default function UserLeaderBoard({ rank, name, balance }) {
  return (
    <>
      <div className="UserLeaderBoard">
        {rank}. {name} {Math.round(balance * 1000) / 1000}€
      </div>
    </>
  );
}
