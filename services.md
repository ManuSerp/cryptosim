# CRYPTOSIM SERVICES
## API


### Authentification

- Creation de compte utilisateur:
```
cryptosim.vercel.app/api/auth/signup
```
Structure:
```
method: "POST",
    body: JSON.stringify({ pseudo, password }),
    headers: {
      "Content-Type": "application/json",
    },
```
