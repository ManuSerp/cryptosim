import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

async function createUser(pseudo, password) {
  const response = await fetch("/api/auth/signup", {
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

function LoginForm() {
  const pseudoInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredPseudo = pseudoInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        pseudo: enteredPseudo,
        password: enteredPassword,
      });

      if (!result.error) {
        // set some auth state
        router.replace("/"); //send to profile here
      } else {
        alert(result.error);
      }
    } else {
      try {
        const result = await createUser(enteredPseudo, enteredPassword);
        alert("account created");
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  }

  return (
    <div className="auth">
      <div className="auth-form">
        <form onSubmit={submitHandler} className="auth-2">
          <div className="auth-3">
            <label htmlFor="pseudo">Your Pseudo</label>
            <input type="pseudo" id="pseudo" required ref={pseudoInputRef} />
          </div>
          <div className="auth-4">
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className="auth-5">
            <button>{isLogin ? "Login" : "Create Account"}</button>
            <button type="button" onClick={switchAuthModeHandler}>
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
