export default function UserLeaderBoard({ name, balance }) {
  return (
    <div className="UserLeaderBoard">
      <p>
        {name} {balance}
      </p>
    </div>
  );
}
