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

- Authentification
```
cryptosim.vercel.app/api/auth
```
Il faut utiliser les fonctions de next-auth pour authentifier votre JWT token
```
import { signIn } from "next-auth/react";
```



### Cryptomonnaie
- Symbole des diffèrentes cryptos:
```
{"btc":"bitcoin","eth":"ethereum","usd":"uniswap-state-dollar","usdt":"tether","bnb":"binancecoin","xrp":"ripple"}
```

- Récuperation prix crypto:
```
cryptosim.vercel.app/api/crypto/{**symbol of the crypto**}
```
Structure: 
```
cryptosim.vercel.app/api/crypto/btc
```

- Achat de monnaies:
```

cryptosim.vercel.app/api/crypto/btc/trade/{symbole monnaie à acheter}/{symbole monnaie à vendre}/{valeur}

```
/!\ Attention valeur dans la monnaie à **ACHETER** et il faut être **AUTHENTIFIER**
Structure:
```
cryptosim.vercel.app/api/crypto/btc/trade/btc/eth/0.001
```

- vente de monnaies:
```

cryptosim.vercel.app/api/crypto/btc/trade/sell/{symbole monnaie à vendre}/{symbole monnaie à acheter}/{valeur}

```
/!\ Attention valeur dans la monnaie à **VENDRE** et il faut être **AUTHENTIFIER**
Structure:
```
cryptosim.vercel.app/api/crypto/btc/trade/sell/btc/eth/0.001
```

### Base de données

- JSON wallet d'un utilisateur
```
cryptosim.vercel.app/api/db/wallet
```
Structure:
```
const response = await fetch("/api/db/wallet", {
    method: "POST",
    body: JSON.stringify({ pseudo }),
    headers: {
      "Content-Type": "application/json",
    },
    
```
Renvoi un JSON du wallet de l'utilisateur

- JSON Leaderboard
```
cryptosim.vercel.app/api/db/leaderboard
```
Structure:
```
cryptosim.vercel.app/api/db/leaderboard

```
Renvoie un JSON array du Leaderboard dans l'ordre des score décroissants 

- JSON Historique
```
cryptosim.vercel.app/api/db/history
```
Structure:
```
cryptosim.vercel.app/api/db/history

```
Renvoie un JSON array de l'historique dans l'ordre des dates décroissantes







