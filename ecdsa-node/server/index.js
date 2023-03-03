const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "049d935ad0ae885f6df0540b8ca41a2d1e7f45e7b3b2abeb471cc449d12ae8858a011214e5e37161ddf28880528a0edc5ea3849ce9c8d0320df3a3cbc1ec7841fc": 100,   //nico
  "04a9af95b4bdc88f161106865a9e3f88acafaaff75334e869749569a7ce1cd28d57c01d13347d556af4a394d0ddcd72ff7f976b339f1b8045fef77e2186aab91b7": 50,    //cris
  "04800188cd109d25d8700e0b20882c6453db90943b1d24c163090635055d2070f3780567e7e5767cb061248566fa053f15cb94d5c9be9bc51a346a85bca366866a": 75    //jhona
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO: get a signature form the client-side application
  // recover the public address form the signature

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
