import { useState, useRef } from "react";
import clientPromise from "../../lib/mongodb";
import { hash } from "bcryptjs";

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
      const client = await clientPromise;
      const user = await client.db().collection("user_id");

      const checkExisting = await user.findOne({ pseudo: enteredPseudo });
      //Send error response if duplicate user is found
      if (!checkExisting) {
        setRes("ERROR PROBABLY NO USER");
      } else {
        const flag_update = await wlt.updateOne(
          { psd: pseudoInputRef },
          {
            $set: {pwd = await hash(password, 12)},
          }
        );
        setRes("Done")
      }

    } catch (error) {
      console.log(error);
      setRes("error");
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
