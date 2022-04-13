/**
 * This function renders the leaderboard card of a user
 * @param {number} rank 
 * @param {string} name
 * @param {number} balance
 * @returns a users leaderboard card
 */
export default function UserLeaderBoard({ rank, name, balance }) {
  return (
    <>
      <div className="UserLeaderBoard">
        {rank}. {name} {Math.round(balance * 1000) / 1000}€
      </div>
    </>
  );
}
