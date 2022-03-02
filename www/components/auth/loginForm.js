import { signIn } from "next-auth/client";
//...
const status = await signIn("credentials", {
  redirect: false,
  email: email,
  password: password,
});
console.log(status);
