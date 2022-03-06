import { useState, useRef } from "react";

async function searchWallet(pseudo) {
  const response = await fetch("/api/db/wallet", {
    method: "POST",
    body: JSON.stringify({ pseudo }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    password;
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function WalletSeeker() {
  const [resEnd, setRes] = useState();
  const pseudoInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredPseudo = pseudoInputRef.current.value;

    // optional: Add validation

    try {
      const result_q = await searchWallet(enteredPseudo);
      setRes(result_q.psd + ": " + JSON.stringify(result_q.coins));
      //alert(result_q.coins.eur);
    } catch (error) {
      console.log(error);
      setRes("ERROR PROBABLY NO USER");
    }
  }

  return (
    <section>
      <h1>WalletSeeker</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="pseudo">pseudo</label>
          <input type="pseudo" id="pseudo" required ref={pseudoInputRef} />
        </div>
        <div>
          <button>look</button>
        </div>
      </form>
      <div>{resEnd}</div>
    </section>
  );
}

export default WalletSeeker;
