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
  const pseudoInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredPseudo = pseudoInputRef.current.value;

    // optional: Add validation

    try {
      const result = await searchWallet(enteredPseudo);
      console.log(result);
      alert(result);
    } catch (error) {
      console.log(error);
      alert(error);
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
    </section>
  );
}

export default WalletSeeker;
