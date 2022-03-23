import { useState, useRef } from "react";

async function changePass(pseudo, password) {
  const response = await fetch("/api/admin/chgpass", {
    method: "POST",
    body: JSON.stringify({ pseudo, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function NewPass() {
  const [resEnd, setRes] = useState();
  const pseudoInputRef = useRef();
  const passInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredPseudo = pseudoInputRef.current.value;
    const enteredPass = passInputRef.current.value;

    // optional: Add validation

    try {
      const res = await changePass(enteredPseudo, enteredPass);
      setRes(res.message);
    } catch (error) {
      console.log(error);
      setRes(error);
    }
  }

  return (
    <section>
      <h1>pass changer</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="pseudo">pseudo</label>
          <input type="pseudo" id="pseudo" required ref={pseudoInputRef} />
        </div>
        <div>
          <label htmlFor="new pass">new pass</label>
          <input type="pass" id="new pass" required ref={passInputRef} />
        </div>
        <div>
          <button>change</button>
        </div>
      </form>
      <div>{resEnd}</div>
    </section>
  );
}

export default NewPass;
