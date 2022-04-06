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

### Cryptomonnaie
- Symbole des diffèrentes cryptos:
```
{"btc":"bitcoin","eth":"ethereum","usd":"uniswap-state-dollar","usdt":"tether","bnb":"binancecoin","xrp":"ripple"}
```

- Récuperation prix crypto:
```
cryptosim.vercel.app/api/auth/crypto/{**symbol of the crypto**}
```
Structure: 
```
cryptosim.vercel.app/api/auth/crypto/btc
```

- Achat de monnaies:
```

cryptosim.vercel.app/api/auth/crypto/btc/trade/{symbole monnaie à acheter}/{symbole monnaie à vendre}/{valeur}

```
/!\ Attention valeur dans la monnaie à **ACHETER** et il faut être ** AUTHENTIFIER **
Structure:
```
cryptosim.vercel.app/api/auth/crypto/btc/trade/btc/eth/0.001
```

- vente de monnaies:
```

cryptosim.vercel.app/api/auth/crypto/btc/trade/sell/{symbole monnaie à vendre}/{symbole monnaie à acheter}/{valeur}

```
/!\ Attention valeur dans la monnaie à **VENDRE** et il faut être ** AUTHENTIFIER **
Structure:
```
cryptosim.vercel.app/api/auth/crypto/btc/trade/sell/btc/eth/0.001
```




