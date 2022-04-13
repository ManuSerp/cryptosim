import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

import LoginForm from "../components/auth/loginForm";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        if (session.user.name === "admin") {
          router.replace("/account/profile");
        } else {
          router.replace("/");
        }
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
}
//add the auth form au dessus

export default AuthPage;
